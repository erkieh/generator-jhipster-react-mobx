#!/bin/bash

set -e
source $(dirname $0)/00-init-env.sh

#-------------------------------------------------------------------------------
# Force no insight
#-------------------------------------------------------------------------------
if [ "$JHI_FOLDER_APP" == "$HOME/app" ]; then
    mkdir -p "$HOME"/.config/configstore/
    cp "$JHI_INTEG"/configstore/*.json "$HOME"/.config/configstore/
fi

if [[ "$JHI_ENTITY" == "jdl" ]]; then
    #-------------------------------------------------------------------------------
    # Generate with JDL
    #-------------------------------------------------------------------------------
    mkdir -p "$JHI_FOLDER_APP"
    cp -f "$JHI_SAMPLES"/"$JHI_APP"/*.jdl "$JHI_FOLDER_APP"/
    cd "$JHI_FOLDER_APP"
    npm link generator-jhipster-react-mobx
    jhipster import-jdl *.jdl --no-insight -d --blueprints generator-jhipster-react-mobx --skip-install
    npm i

else
    #-------------------------------------------------------------------------------
    # Generate UAA project with jhipster
    #-------------------------------------------------------------------------------
    if [[ "$JHI_APP" == *"uaa"* ]]; then
        mkdir -p "$JHI_FOLDER_UAA"
        cp -f "$JHI_SAMPLES"/uaa/.yo-rc.json "$JHI_FOLDER_UAA"/
        cd "$JHI_FOLDER_UAA"
        npm link generator-jhipster-react-mobx
        jhipster --force --no-insight --with-entities --skip-checks --from-cli -d --blueprints generator-jhipster-react-mobx --skip-install
        npm i
        ls -al "$JHI_FOLDER_UAA"
    fi

    #-------------------------------------------------------------------------------
    # Generate project with jhipster
    #-------------------------------------------------------------------------------
    mkdir -p "$JHI_FOLDER_APP"
    cp -f "$JHI_SAMPLES"/"$JHI_APP"/.yo-rc.json "$JHI_FOLDER_APP"/
    cd "$JHI_FOLDER_APP"
    npm link generator-jhipster-react-mobx
    jhipster --force --no-insight --skip-checks --with-entities --from-cli -d --blueprints generator-jhipster-react-mobx --skip-install
    npm i

fi

#-------------------------------------------------------------------------------
# Check folder where the app is generated
#-------------------------------------------------------------------------------
ls -al "$JHI_FOLDER_APP"
git --no-pager log -n 10 --graph --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
