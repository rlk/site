
CPPC= g++
OPTS= -ansi -pedantic -Wall -g
LIBS= -ltiff -lGLEW -framework GLUT -framework OpenGL

%.o : %.cpp
	$(CPPC) $(OPTS) -c $<

viewcube : viewcube.o
	$(CPPC) $(OPTS) -o $@ $^ $(LIBS)

clean :
	rm -f viewcube viewcube.o
