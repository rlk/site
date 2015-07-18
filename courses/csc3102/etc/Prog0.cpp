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
