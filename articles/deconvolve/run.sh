#!/bin/sh

# Compute the Fourier transform of license.tif
convert -l5 license.tif license.bin
fourier -l5 license.bin
fourier -l5 -T license.bin
convert -l5 license.bin license-fourier.tif

# Compute the Fourier transform of license-denoised.tif
convert -l5 license-denoised.tif license-denoised.bin
fourier -l5 license-denoised.bin
fourier -l5 -T license-denoised.bin
convert -l5 license-denoised.bin license-denoised-fourier.tif

# Compute the Fourier transform of blur.tif
convert -l5 blur.tif blur.bin
compute -l5 -s 0.0289595 blur.bin
fourier -l5 blur.bin
fourier -l5 -T blur.bin
convert -l5 blur.bin blur-fourier.tif

# Performa a naive deconvolution
cp license.bin license-divide.bin
compute -l5 -D license-divide.bin blur.bin
fourier -l5 -I license-divide.bin
fourier -l5 -IT license-divide.bin
convert -l5 license-divide.bin license-divide.tif

# Perform a Wiener deconvolution at 0.5
cp license.bin license-wiener.bin
compute -l5 -w0.5 license-wiener.bin blur.bin
fourier -l5 -I license-wiener.bin
fourier -l5 -IT license-wiener.bin
convert -l5 license-wiener.bin license-wiener-0-5.tif

# Perform a Wiener deconvolution at 0.1
cp license.bin license-wiener.bin
compute -l5 -w0.1 license-wiener.bin blur.bin
fourier -l5 -I license-wiener.bin
fourier -l5 -IT license-wiener.bin
convert -l5 license-wiener.bin license-wiener-0-1.tif

# Perform a Wiener deconvolution at 0.05
cp license.bin license-wiener.bin
compute -l5 -w0.05 license-wiener.bin blur.bin
fourier -l5 -I license-wiener.bin
fourier -l5 -IT license-wiener.bin
convert -l5 license-wiener.bin license-wiener-0-05.tif

# Perform a Wiener deconvolution at 0.01
cp license.bin license-wiener.bin
compute -l5 -w0.01 license-wiener.bin blur.bin
fourier -l5 -I license-wiener.bin
fourier -l5 -IT license-wiener.bin
convert -l5 license-wiener.bin license-wiener-0-01.tif

# Perform a Wiener deconvolution at 0.001
cp license.bin license-wiener.bin
compute -l5 -w0.001 license-wiener.bin blur.bin
fourier -l5 -I license-wiener.bin
fourier -l5 -IT license-wiener.bin
convert -l5 license-wiener.bin license-wiener-0-001.tif

# Perform a Wiener deconvolution of the denoised input at 0.05
cp license-denoised.bin license-denoised-wiener.bin
compute -l5 -w0.05 license-denoised-wiener.bin blur.bin
fourier -l5 -I license-denoised-wiener.bin
fourier -l5 -IT license-denoised-wiener.bin
convert -l5 license-denoised-wiener.bin license-denoised-wiener-0-05.tif
