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
