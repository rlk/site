# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 0

The purpose of Project 0 is to orient you to the use of your *classes.csc.lsu.edu* account and to the details required of a correct CSC 3102 programming project.

Different instructors use *classes.csc* in different ways. Our usage is documented here. In particular:

- A project must compile and run on *classes.csc* to be acceptable for grading. Regardless of which OS or IDE you use to develop your code, you should test it on *classes.csc* to be certain it works there.

- A project must be submitted as a collection of Java or C++ source files in a directory named `progN`, where `N` is the project number. Files must not be separated into subdirectories and must not be ZIP-ed or otherwise archived.

- A project must be submitted using `p_copy`, as described below. It does not suffice merely to upload code to *classes.csc*.

- Project code must include your name at it appears on your LSU ID plus your LSU email address.

- Late project submissions are absolutely not accepted.

### Install the Tools

In addition to your IDE, you'll need additional software to access *classes.csc*: `scp` and `ssh`. OS X and Linux users will find that the necessary software is already installed and available from the Bash prompt.

I *highly* recommend that Windows users install [Git](https://www.git-scm.com/). We won't be using Git in this class, but the Git installer includes a complete Bash environment identical to that found under OS X and Linux. This way, we'll all use the same interface to *classes.csc*.

[Here is an in-depth introduction to the Bash prompt](http://ryanstutorials.net/linuxtutorial/) if needed.

### Write the Code

The Project 0 code is trivial: it computes the average of a list of numbers. Create a directory called `prog0` to store the project files. The programming work is done for you.

If you are a Java user, type the following Java code into to a file named `Prog0.java` in the `prog0` directory.

    // Programming Project 0
    // Mike Tiger IV <mtiger6@lsu.edu>

    import java.io.*;
    import java.util.Scanner;

    public class Prog0 {
        public static void main(String[] args) throws FileNotFoundException {
            Scanner input = new Scanner(new File(args[0]));
            int     total = 0;
            int     count = 0;

            while (input.hasNextInt()) {
                int i = input.nextInt();
                total += i;
                count += 1;
            }

            System.out.println((float) total / count);
        }
    }

If you are a C++ user, type the following C++ code into a file named `Prog0.cpp` in the `prog0` directory.

    // Programming Project 0
    // Mike Tiger IV <mtiger6@lsu.edu>

    #include <iostream>
    #include <fstream>

    int main(int argc, char **argv)
    {
        std::ifstream input(argv[1]);
        int total = 0;
        int count = 0;
        int i;

        while (input >> i)
        {
            total += i;
            count += 1;
        }

        std::cout << float(total) / count << std::endl;
    }

If you use an IDE on your computer to create that file, test it there to make sure it works.

Upload the `prog0` to your *classes.csc* account by navigating the Bash prompt to the directory that contains `prog0` and executing this command:

    scp -r prog0 cs3102xx@classes.csc.lsu.edu:prog0

Here, `xx` is the unique part of your account name.

Alternatively, you can write your code directly on *classes.csc* using one of the Unix text editors, `nano`, `vim`, `emacs`, etc. With this approach, you can make fixes and improvements to your submission without the need to re-upload it with each change.

### Test the Code

The Prog0 example is representative of the form taken by all CSC 3102 programming projects: input is given by a file that is named in the argument list, and output is given on the standard output. To test your project, you'll need an input file. Create a file named `input.txt` with the following contents and place it in your `prog0` directory on *classes.csc*.

    10 11 12 13 14 15

Log in to *classes.csc* using your SSH client. This will give you a Bash shell on *classes*. [Here's another link to the Bash tutorial](http://ryanstutorials.net/linuxtutorial/).

        ssh cs3102xx@classes.csc.lsu.edu

- Your shell begins in your home directory. Change the directory to `prog0`.

        cd prog0

- To test Java code there, compile it.

        javac Prog0.java

    If you receive compilation errors, fix them. When it compiles, run it.

        java Prog0 input.txt

    If it runs correctly, you'll receive the output `12.5`, which is the average of the input values.

- To test C++ code, compile it.

        g++ -o Prog0 Prog0.cpp

    And run it.

        ./Prog0 input.txt

    If it runs correctly, you'll receive the output `12.5`.

### Submit the Code

To submit your finished code for grading, use the following command. Here, `cs3102_koo` is your instructor's account name and `0` is the assignment number.

    ~cs3102_koo/bin/p_copy 0

You can use `p_copy` repeatedly if you need to make corrections. It will overwrite the original homework submission with each use. Note that this could cause your work to be considered late if you resubmit after the assignment's deadline.

Verify that your code was properly submitted by viewing the list of submitted files and their timestamps:

    ~cs3102_koo/bin/verify 0
