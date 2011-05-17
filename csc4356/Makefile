
CC= gcc
CFLAGS= -ansi -pedantic -Wall -g

#-------------------------------------------------------------------------------

ifeq ($(shell uname), Darwin)
	OGLLIB= -framework OpenGL -framework GLUT
else
	OGLLIB= -lGL -lglut
endif

#-------------------------------------------------------------------------------

%.o : %.c
	$(CC) $(CFLAGS) -c $<

hello-world : hello-world.o
	$(CC) $(CFLAGS) -o $@ $^ $(OGLLIB)
