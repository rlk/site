# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 0

The purpose of Project 0 is to orient you to the use of your *classes.csc.lsu.edu* account and to the details required of a correct CSC 3102 programming project.

Different instructors use *classes.csc* in different ways. Our usage is documented here. In particular:

- A project must compile and run on *classes.csc* to be acceptable for grading. Regardless of which OS or IDE you use to develop your code, you should test it on *classes.csc* to be certain it works there.

- A project must be submitted as a collection of Java or C++ source files in a directory named `progN`, where `N` is the project number. Files must not be separated into subdirectories and must not be ZIP-ed or otherwise archived.

- A project must be submitted using `p_copy`, as described below. It does not suffice merely to upload code to *classes.csc*.

- Project code must include your name at it appears on your LSU ID plus your LSU email address.

### Install the Tools

In addition to your IDE, you'll need two additional pieces of software to access *classes.csc*:

- SCP, short for Secure CoPy, allows you to upload files to *classes.csc*.
- SSH, short for Secure SHell, allows you to log in to *classes.csc*.

OS X and Linux users will find `scp` and `ssh` already installed and available from the Terminal.

Windows users commonly use [WinSCP](https://winscp.net/eng/download.php) as their SCP client and [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) for their SSH client.

### Get Familiar with the Command Line.

[Here is an in-depth introduction to the Bash prompt](http://ryanstutorials.net/linuxtutorial/). If you have no Bash experience, read at least the section on Basic Navigation. Much of the necessary commands are documented below.

### Write the Code

The Project 0 code is a just a review:

- Read a file containing a list of up to 256 words.
- Store them in a *simple* array (not a vector or ArrayList).
- Print them in alphabetical order.

You have undoubtedly encountered basic sorting in your Introduction to Programming coursework, so implement one of the algorithms you learned there.

To begin, create a directory called `prog0` to store the project files.

If you are a Java user, add the following Java framework code into to a file named `Prog0.java` in the `prog0` directory.

    // Programming Project 0
    // Mike Tiger VI <mtiger6@lsu.edu>

    import java.io.*;
    import java.util.Scanner;

    public class Prog0 {
        public static void main(String[] args) throws FileNotFoundException {
            Scanner input = new Scanner(new File(args[0]));

            while (input.hasNext()) {
                // etc...
            }

            // etc...
        }
    }

If you are a C++ user, add the following C++ code into a file named `Prog0.cpp` in the `prog0` directory.

    // Programming Project 0
    // Mike Tiger VI <mtiger6@lsu.edu>

    #include <iostream>
    #include <fstream>

    int main(int argc, char **argv)
    {
        std::ifstream input(argv[1]);
        std::string s;

        while (input >> s)
        {
            // etc...
        }

        // etc...
    }

That framework code demonstrates how to receive a file name on the command line and scan the named file for integers. Replace the `etc` sections with the logic necessary to perform the sorting task.

### Upload the Code

Upload the `prog0` to your *classes.csc* account. If you use the command line `scp` client, navigate the Bash prompt to the directory that contains `prog0` and execute this command:

    scp -r prog0 cs3102xx@classes.csc.lsu.edu:prog0

Here, `xx` is the unique part of your account name.

Alternatively, you can write your code directly on *classes.csc* using one of the Unix text editors, `nano`, `vim`, `emacs`, etc. With this approach, you can make fixes and improvements to your submission without the need to re-upload it with each change.

Note, if you need to re-upload your work after making changes, you *might* need to delete the `prog0` directory on classes before `scp`ing a second time.

### Test the Code

The Prog0 example is representative of the form taken by all CSC 3102 programming projects: input is given by a file that is named in the argument list, and output is given on the standard output. To test your project, you'll need an input file. Create a file named `input.txt` with the following contents and place it in your `prog0` directory on *classes.csc*.

> `buy it use it break it fix it trash it change it mail upgrade it charge it point it zoom it press it snap it work it quick erase it write it cut it paste it save it load it check it quick rewrite it plug it play it burn it rip it drag it drop it zip unzip it lock it fill it call it find it view it code it jam unlock it surf it scroll it pause it click it cross it crack it switch update it name it read it tune it print it scan it send it fax rename it touch it bring it pay it watch it turn it leave it stop format it`

Log in to *classes.csc* using your SSH client. This will give you a Bash shell on *classes*. [Here's another link to the Bash tutorial](http://ryanstutorials.net/linuxtutorial/).

        ssh cs3102xx@classes.csc.lsu.edu

- Your shell begins in your home directory. Change the directory to `prog0`.

        cd prog0

- To test Java code there, compile it.

        javac Prog0.java

    If you receive compilation errors, fix them. When it compiles, run it.

        java Prog0 input.txt

    If it runs correctly, you'll receive the output

    > `break bring burn buy call change charge check click code crack cross cut drag drop erase fax fill find fix format it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it jam leave load lock mail name paste pause pay play plug point press print quick quick read rename rewrite rip save scan scroll send snap stop surf switch touch trash tune turn unlock unzip update upgrade use view watch work write zip zoom`

    NetBeans users often face an error here due to the fact that NetBeans automatically inserts a `package` command into your code. Simply remove it.

- To test C++ code, compile it.

        g++ -o Prog0 Prog0.cpp

    And run it.

        ./Prog0 input.txt

    If it runs correctly, you'll receive the output

    > `break bring burn buy call change charge check click code crack cross cut drag drop erase fax fill find fix format it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it it jam leave load lock mail name paste pause pay play plug point press print quick quick read rename rewrite rip save scan scroll send snap stop surf switch touch trash tune turn unlock unzip update upgrade use view watch work write zip zoom`

Each programming assignment will include a sample input and output, as above. But be advised that this is *not* the input that the grader will use to test your code. Be sure your code works with a variety of different input files, with different names.

### Submit the Code

To submit your finished code for grading, use the following command. Here, `cs3102_koo` is your instructor's account name and `0` is the assignment number.

    ~cs3102_koo/bin/p_copy 0

You can use `p_copy` repeatedly if you need to make corrections. It will overwrite the original homework submission with each use. Note that this could cause your work to be considered late if you resubmit after the assignment's deadline.

Verify that your code was properly submitted by viewing the list of submitted files and their timestamps:

    ~cs3102_koo/bin/verify 0
