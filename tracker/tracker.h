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

#ifndef TRACKER_H
#define TRACKER_H

#define DEFAULT_TRACKER_KEY 4126
#define DEFAULT_CONTROL_KEY 4127

#ifdef __cplusplus
extern "C" {
#endif

/*---------------------------------------------------------------------------*/

    int  tracker_init(int, int);
    void tracker_fini(void);

    int  tracker_status(void);

/*---------------------------------------------------------------------------*/

    void tracker_rotation(int, float[3][3]);
    void tracker_position(int, float[3]);
    void tracker_joystick(int, float[2]);
    
    int  tracker_buttons(void);
    
/*---------------------------------------------------------------------------*/

    void tracker_frustum(const float[3],
                         const float[3],
                         const float[3],
                         const float[3]);

/*---------------------------------------------------------------------------*/

#ifdef __cplusplus
}
#endif
#endif
