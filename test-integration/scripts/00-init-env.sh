#!/usr/bin/env bash

JHI_DETECTED_DIR="$( cd "$( dirname $( dirname $( dirname "${BASH_SOURCE[0]}" ) ) )" >/dev/null 2>&1 && pwd )"

init_var() {
    result=""
    if [[ $1 != "" ]]; then
        result=$1
    elif [[ $2 != "" ]]; then
        result=$2
    elif [[ $3 != "" ]]; then
        result=$3
    fi
    echo $result
}

# uri of repo
if [[ "$JHI_REPO" == "" ]]; then
    JHI_REPO=$(init_var "$BUILD_REPOSITORY_URI" "$GITHUB_WORKSPACE" )
fi

# folder for generator-jhipster
if [[ "$JHI_HOME" == "" ]]; then
    JHI_HOME="$JHI_DETECTED_DIR"
fi

# folder where the repo is cloned
if [[ "$JHI_REPO_PATH" == "" ]]; then
    JHI_REPO_PATH=$(init_var "$BUILD_REPOSITORY_LOCALPATH" "$GITHUB_WORKSPACE")
fi

if [[ "$JHI_LIB_HOME" == "" ]]; then
    if [[ "$JHI_REPO" == *"/jhipster-bom" ]]; then
        JHI_LIB_HOME="$JHI_REPO_PATH"
    else
        JHI_LIB_HOME="$HOME"/jhipster-bom
    fi
fi

# folder for test-integration
if [[ "$JHI_INTEG" == "" ]]; then
    JHI_INTEG="$JHI_HOME"/test-integration
fi

# folder for samples
if [[ "$JHI_SAMPLES" == "" ]]; then
    JHI_SAMPLES="$JHI_INTEG"/samples
fi

if [[ -d "$JHI_SAMPLES"/.jhipster ]]; then
    JHI_ENTITY_SAMPLES="$JHI_SAMPLES"/.jhipster
else
    JHI_ENTITY_SAMPLES="$JHI_HOME"/test-integration/samples/.jhipster
fi

# folder for jdls samples
if [[ "$JHI_JDL_SAMPLES" == "" ]]; then
    JHI_JDL_SAMPLES="$JHI_INTEG"/jdl-samples
fi

# folder for scripts
if [[ "$JHI_SCRIPTS" == "" ]]; then
    JHI_SCRIPTS="$JHI_INTEG"/scripts
fi

# folder for app
if [[ "$JHI_FOLDER_APP" == "" ]]; then
    JHI_FOLDER_APP="$HOME"/app
fi

# jdk version
if [[ "$JHI_JDK" == "" ]]; then
    JHI_JDK=11
fi

# set correct OpenJDK version
if [[ "$JHI_JDK" == "11" && "$JHI_GITHUB_CI" != "true" ]]; then
    JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")
fi

# node version
JHI_NODE_VERSION=14.17.6

# npm version
JHI_NPM_VERSION=7.18.1
