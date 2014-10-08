#!/bin/sh

obj2svg -A -F -E -V -l0.25 -r7 -d5 -t15 -p-30 -a 30 tinyhouse-pos.obj >  tinyhouse-all2.svg
obj2svg          -N -l0.25 -r7 -d5 -t15 -p-30 -a 30 tinyhouse-nrm.obj >> tinyhouse-all2.svg

