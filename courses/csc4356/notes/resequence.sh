#!/bin/sh

ext=.tmp

read prev;
read curr;

sed -i$ext -e "s/id=\"next\" href=\".*\"/id=\"next\" href=\"$curr\"/" $prev

while read next; do
	sed -i$ext -e "s/id=\"prev\" href=\".*\"/id=\"prev\" href=\"$prev\"/" $curr
	sed -i$ext -e "s/id=\"next\" href=\".*\"/id=\"next\" href=\"$next\"/" $curr
	prev=$curr
	curr=$next
done

sed -i$ext -e "s/id=\"prev\" href=\".*\"/id=\"prev\" href=\"$prev\"/" $curr

rm *$ext
