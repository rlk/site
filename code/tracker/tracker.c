/*    Copyright (C) 2005 Robert Kooima                                       */
/*                                                                           */
/*    TRACKER is free software;  you can redistribute it and/or modify it    */
/*    under the terms of the  GNU General Public License  as published by    */
/*    the  Free Software Foundation;  either version 2 of the License, or    */
/*    (at your option) any later version.                                    */
/*                                                                           */
/*    This program is distributed in the hope that it will be useful, but    */
/*    WITHOUT  ANY  WARRANTY;  without   even  the  implied  warranty  of    */
/*    MERCHANTABILITY or  FITNESS FOR A PARTICULAR PURPOSE.   See the GNU    */
/*    General Public License for more details.                               */

#include <string.h>
#include <stdlib.h>
#include <stdio.h>

/*---------------------------------------------------------------------------*/

#ifdef __linux__
#include <sys/shm.h>
#include <stdint.h>
#include <GL/gl.h>
#endif

#ifdef _WIN32
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <GL/gl.h>
typedef unsigned int uint32_t;
#endif

#ifdef __APPLE__
#include <sys/shm.h>
#include <stdint.h>
#include <OpenGL/gl.h>
#endif

/*---------------------------------------------------------------------------*/

struct tracker_header
{
    uint32_t version;
    uint32_t count;
    uint32_t offset;
    uint32_t size;
    uint32_t time[2];
    uint32_t command;
};

struct control_header
{
    uint32_t version;
    uint32_t but_offset;
    uint32_t val_offset;
    uint32_t but_count;
    uint32_t val_count;
    uint32_t time[2];
    uint32_t command;
};

struct sensor
{
    float    p[3];
    float    r[3];
    uint32_t t[2];
    uint32_t calib;
    uint32_t frame;
};

struct transform
{
    float M[16];
};

/*---------------------------------------------------------------------------*/

#ifndef _WIN32
static int tracker_id = -1;
static int control_id = -1;
#else
static volatile HANDLE tracker_id = NULL;
static volatile HANDLE control_id = NULL;
#endif

static struct tracker_header *tracker = (struct tracker_header *) (-1);
static struct control_header *control = (struct control_header *) (-1);
static uint32_t              *buttons = NULL;

/*---------------------------------------------------------------------------*/

int tracker_init(int t_key, int c_key)
{
    /* Acquire the tracker and controller shared memory segments. */

#ifndef _WIN32

    if ((tracker_id = shmget(t_key, sizeof (struct tracker_header), 0)) >= 0)
        tracker = (struct tracker_header *) shmat(tracker_id, 0, 0);

    if ((control_id = shmget(c_key, sizeof (struct control_header), 0)) >= 0)
        control = (struct control_header *) shmat(control_id, 0, 0);

#else

    char shmkey[256];

    sprintf(shmkey, "%d", t_key);

    if ((tracker_id = OpenFileMapping(FILE_MAP_WRITE, FALSE, shmkey)))
        tracker = (struct tracker_header *)
                    MapViewOfFile(tracker_id, FILE_MAP_WRITE, 0, 0, 0);
    else
        tracker = (struct tracker_header *) (-1);

    sprintf(shmkey, "%d", c_key);

    if ((control_id = OpenFileMapping(FILE_MAP_WRITE, FALSE, shmkey)))
        control = (struct control_header *)
                    MapViewOfFile(control_id, FILE_MAP_WRITE, 0, 0, 0);
    else
        control = (struct control_header *) (-1);

#endif

    /* Allocate storage for button states. */

    if (control != (struct control_header *) (-1))
        buttons = (uint32_t *) calloc(control->but_count, sizeof (uint32_t));

    return 1;
}

void tracker_fini(void)
{
    /* Detach shared memory segments. */

#ifndef _WIN32
    if (control != (struct control_header *) (-1)) shmdt(control);
    if (tracker != (struct tracker_header *) (-1)) shmdt(tracker);

    control_id = -1;
    tracker_id = -1;
#else
    if (control != (struct control_header *) (-1)) UnmapViewOfFile(control);
    if (tracker != (struct tracker_header *) (-1)) UnmapViewOfFile(tracker);

    CloseHandle(control_id);
    CloseHandle(tracker_id);

    control_id = NULL;
    tracker_id = NULL;
#endif

    if (buttons) free(buttons);

    /* Mark everything as uninitialized. */

    control = (struct control_header *) (-1);
    tracker = (struct tracker_header *) (-1);

    buttons = NULL;
}

int tracker_status(void)
{
    return ((tracker != (struct tracker_header *) (-1)));
}

/*---------------------------------------------------------------------------*/

void tracker_rotation(int id, float R[3][3])
{
    if (tracker != (struct tracker_header *) (-1))
    {
        if ((uint32_t) id < tracker->count)
        {
            float ch, sh;
            float ca, sa;
            float cb, sb;

            /* Return the basis of sensor ID. */

            struct sensor *S =
                (struct sensor *)((unsigned char *) tracker
                                                  + tracker->offset
                                                  + tracker->size * id);
            ch = (float) cos(S->r[0]);
            sh = (float) sin(S->r[0]);
            ca = (float) cos(S->r[1]);
            sa = (float) sin(S->r[1]);
            cb = (float) cos(S->r[2]);
            sb = (float) sin(S->r[2]);

            R[0][0] =  ch * ca;
            R[0][1] =  sh * sb - ch * sa * cb;
            R[0][2] =  ch * sa * sb + sh * cb;
            R[1][0] =  sa;
            R[1][1] =  ca * cb;
            R[1][2] = -ca * sb;
            R[2][0] = -sh * ca;
            R[2][1] =  sh * sa * cb + ch * sb;
            R[2][2] = -sh * sa * sb + ch * cb;
        }
    }
}

void tracker_position(int id, float p[3])
{
    if (tracker != (struct tracker_header *) (-1))
    {
        if ((uint32_t) id < tracker->count)
        {
            /* Return the position of sensor ID. */

            struct sensor *S =
                (struct sensor *)((unsigned char *) tracker
                                                  + tracker->offset
                                                  + tracker->size * id);
            p[0] = S->p[0];
            p[1] = S->p[1];
            p[2] = S->p[2];
        }
    }
}

void tracker_joystick(int id, float a[2])
{
    if (control != (struct control_header *) (-1))
    {
        float *p = (float *) ((unsigned char *) control + control->val_offset);

        /* Return valuators ID and ID + 1. */
        
        if ((uint32_t) id < control->val_count - 1)
        {
            a[0] = +(*(p + id + 0));
            a[1] = -(*(p + id + 1));
        }
    }
}

int tracker_buttons(int *id, int *st)
{
    uint32_t  r = 0;
    uint32_t  i;
    uint32_t  b;
    uint32_t *p;

    if (buttons && control != (struct control_header *) (-1))
    {
        p = (uint32_t *) ((unsigned char *) control + control->but_offset);

        /* Scan for buttons that do not match their cached state. */

        for (i = 0, b = 1, r = 0; i < control->but_count; ++i, ++p, b << 1)
            if (buttons[i] != *p)
            {
                /* Update the cache and set a bit in the return value. */
            
                buttons[i]  = *p;
                r |= b;
            }
    }
    return (int) r;
}

/*---------------------------------------------------------------------------*/

static void normalize(float v[3])
{
    float k = 1.0f / (float) sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);

    v[0] *= k;
    v[1] *= k;
    v[2] *= k;
}

void tracker_frustum(const float BL[3],
                     const float TL[3],
                     const float BR[3], const float P[3], float n, float f)
{
    float R[3];
    float U[3];
    float N[3];
    float k;

    /* Find the basis of the screen space. */

    R[0] = V->screen_BR[0] - V->screen_BL[0];
    R[1] = V->screen_BR[1] - V->screen_BL[1];
    R[2] = V->screen_BR[2] - V->screen_BL[2];

    U[0] = V->screen_TL[0] - V->screen_BL[0];
    U[1] = V->screen_TL[1] - V->screen_BL[1];
    U[2] = V->screen_TL[2] - V->screen_BL[2];

    N[0] = R[1] * U[2] - R[2] * U[1];
    N[1] = R[2] * U[0] - R[0] * U[2];
    N[2] = R[0] * U[1] - R[1] * U[0];

    normalize(R);
    normalize(U);
    normalize(N);

    k = N[0] * (V->screen_BL[0] - P[0]) + 
        N[1] * (V->screen_BL[1] - P[1]) +
        N[2] * (V->screen_BL[2] - P[2]);

    glMatrixMode(GL_PROJECTION);
    {
        float M[16];

        /* Compute the world-space edges of the view port. */

        double l = n * (R[0] * (P[0] - V->screen_BL[0]) +
                        R[1] * (P[1] - V->screen_BL[1]) +
                        R[2] * (P[2] - V->screen_BL[2])) / k;
        double r = n * (R[0] * (P[0] - V->screen_BR[0]) +
                        R[1] * (P[1] - V->screen_BR[1]) +
                        R[2] * (P[2] - V->screen_BR[2])) / k;
        double b = n * (U[0] * (P[0] - V->screen_BL[0]) +
                        U[1] * (P[1] - V->screen_BL[1]) +
                        U[2] * (P[2] - V->screen_BL[2])) / k;
        double t = n * (U[0] * (P[0] - V->screen_TL[0]) +
                        U[1] * (P[1] - V->screen_TL[1]) +
                        U[2] * (P[2] - V->screen_TL[2])) / k;

        glLoadIdentity();

        /* Apply the projection. */

        glFrustum(l, r, b, t, n, f);

        /* Account for the orientation of the display. */

        M[0] = R[0]; M[4] = R[1]; M[ 8] = R[2]; M[12] = 0.0f;
        M[1] = U[0]; M[5] = U[1]; M[ 9] = U[2]; M[13] = 0.0f;
        M[2] = N[0]; M[6] = N[1]; M[10] = N[2]; M[14] = 0.0f;
        M[3] = 0.0f; M[7] = 0.0f; M[11] = 0.0f; M[15] = 1.0f;

        glMultMatrixf(M);

        /* Move the apex of the frustum to the origin. */

        glTranslatef(-P[0], -P[1], -P[2]);
    }
    glMatrixMode(GL_MODELVIEW);
}

/*---------------------------------------------------------------------------*/
