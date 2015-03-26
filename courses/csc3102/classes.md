# How to submit a Programming Project

1. Log on to `classes.csc.lsu.edu` using an SSH client.

2. Create a program directory `progN` with `N` being the number of the assignment designated by your teacher (`prog0`, `prog1`, etc).

3. Write or place homework files in this directory, ready to be compiled and run. Include only the necessary source files. Do not ZIP, compress, or otherwise encode these files. Note that only files can be submitted for grading, and directories and their contents will be ignored.

4. When your work is finished, use the command

		~cs3102_koo/bin/p_copy N

	Here, `~cs3102_koo` is your teacher's grading account name and `N` is the assignment number.

5. You can use `p_copy` again if you need to make corrections.  It will overwrite the original homework submission including the time stamp. Note that this could cause your work to be considered late if you resubmit after the assignment's deadline.

6. You can use the command

		~cs3102_koo/bin/verify N

	to view the list of files you have submitted and their timestamps. This verifies that your homework was properly submitted for grading.
