# The Classes Server

Different instructors use *classes.csc.lsu.edu* in different ways. Our usage is documented here. In particular:

- A project must compile and run on *classes.csc.lsu.edu* to be acceptable for grading. Regardless of which OS or IDE you use to develop your code, you should test it on *classes.csc.lsu.edu* to be certain it works there.

- A project must be submitted as a collection of Java or C++ source files in a directory named `progN`, where `N` is the project number. Files must not be separated into subdirectories and must not be ZIP-ed or otherwise archived.

- A project must be submitted using `p_copy`, as described below. It does not suffice merely to upload code to *classes.csc.lsu.edu*.

- Project code must include your name at it appears on your LSU ID plus your LSU email address.

# To submit a programming project.

1. Log on to *classes.csc.lsu.edu* using an SSH client.

	- Run `ssh` from the terminal under OS X or Linux.
	- [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) is a common choice under Windows.

	After entering your login and password, you are given a [Unix Command Prompt](http://ryanstutorials.net/linuxtutorial/).

1. Create a program directory `progN` with `N` being the number of the assignment (`prog0`, `prog1`, etc).

1. Write or place project files in this directory, ready to be compiled and run. Include only the project source files and any necessary input files. Do not ZIP, compress, or otherwise encode these files. Note that only files can be submitted for grading, and directories and their contents will be ignored.

	- Copy files from your OS X or Linux computer using `scp` from the terminal.
	- [WinSCP](https://winscp.net/eng/download.php) is a common choice under Windows.

1. Your code will be evaluated by running it on *classes.csc.lsu.edu*. Different operating systems and language versions may introduce incompatibilities, so test your code by compiling and running it there.

	To test C++ code, compile:

		g++ -o prog1 prog1.cpp

	And run:

		prog1

	To test Java code, compile:

		javac Prog1.java

	And run:

		java Prog1

	You can modify your code on classes using one of the Unix text editors: `nano`, `vim`, `emacs`.

1. To submit your finished code, use the command:

		~cs3102_koo/bin/p_copy N

	Here, `~cs3102_koo` is your teacher's grading account name and `N` is the assignment number.

1. You can use `p_copy` again if you need to make corrections.  It will overwrite the original homework submission including the time stamp. Note that this could cause your work to be considered late if you resubmit after the assignment's deadline.

1. You can use the command

		~cs3102_koo/bin/verify N

	to view the list of files you have submitted and their timestamps. This verifies that your homework was properly submitted for grading.
