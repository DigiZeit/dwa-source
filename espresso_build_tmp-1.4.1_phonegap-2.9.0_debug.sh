#!/bin/bash

sudo rm /opt/Espresso
sudo ln -s /opt/Espresso_1.4.1 /opt/Espresso

prepare_debugbuild.sh ~/workspace/DIGI-WebApp-Source\ tmp\ 1.4\ phonegap\ 2.9.0/
espresso_build.sh debug ~/workspace/DIGI-WebApp-Source\ tmp\ 1.4\ phonegap\ 2.9.0/

sudo rm /opt/Espresso
sudo ln -s /opt/Espresso_1.0 /opt/Espresso
