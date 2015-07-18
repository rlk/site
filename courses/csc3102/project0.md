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

In addition to your IDE, you'll need two pieces of software to access *classes.csc*.

1. You'll need an SCP client to copy your code to *classes.csc*. [WinSCP](http://winscp.net) works well under Windows. The `scp` command line tool is built into Linux and OS X.

2. You'll need an SSH client to issue commands on *classes.csc*. [PuTTY](http://www.putty.org/) is the preferred Windows utility. The `ssh` command line tool is built into Linux and OS X.

### Write the Code

The Project 0 code is trivial: it computes the average of a list of numbers. The programming work is done for you. If you are a Java user, type the following Java code into to a file named `Prog0.java`.

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

If you are a C++ user, type the following C++ code into a file named `Prog0.cpp`.

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

If you use an IDE on your computer to create that file, test it there to make sure it works. Then, upload it to a directory named `prog0` in your *classes.csc* account.

Alternatively, you can write your code directly on *classes.csc* using one of the Unix text editors, `nano`, `vim`, `emacs`, etc. With this approach, you can make fixes and improvements to your submission without the need to re-upload it with each change.

### Test the Code

The Prog0 example is representative of the form taken by all CSC 3102 programming projects: input is given by a file that is named in the argument list, and output is given on the standard output. To test your project, you'll need an input file. Create a file named `input.txt` with the following contents and place it in your `Prog0` directory on *classes.csc*.

    10 11 12 13 14 15

Log in to *classes.csc* using your SSH client. This will give you a Unix shell, which is [really, really worth learning](http://ryanstutorials.net/linuxtutorial/).

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
