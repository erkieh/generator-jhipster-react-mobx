/*
 * Copyright 2020 Erki Ehtla.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const constants = require('generator-jhipster/generators/generator-constants');
const writeFiles = require('./files-react').writeFiles;
const NeedleClientReact = require('./needle-api/needle-client-react-mobx');

const REACT = constants.SUPPORTED_CLIENT_FRAMEWORKS.REACT;

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(
                `This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint jhipster-react-mobx')}`
            );
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        return super._configuring();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return {
            writeAdditionalFile() {
                writeFiles.call(this);
            }
        };
    }

    get needleClientReact() {
        if (this._needleClientReact === undefined || this._needleClientReact === null) {
            this._needleClientReact = new NeedleClientReact(this);
        }
        return this._needleClientReact;
    }

    /**
     * Add a new entity in the TS modules file.
     *
     * @param {string} entityInstance - Entity Instance
     * @param {string} entityClass - Entity Class
     * @param {string} entityName - Entity Name
     * @param {string} entityFolderName - Entity Folder Name
     * @param {string} entityFileName - Entity File Name
     * @param {boolean} entityUrl - Entity router URL
     * @param {string} clientFramework - The name of the client framework
     * @param {string} microServiceName - Microservice Name
     */
    addEntityToModule(
        entityInstance,
        entityClass,
        entityName,
        entityFolderName,
        entityFileName,
        entityUrl,
        clientFramework,
        microServiceName
    ) {
        if (clientFramework === REACT) {
            this.needleClientReact.addEntityToModule(entityInstance, entityClass, entityName, entityFolderName, entityFileName);
        }
    }

    get install() {
        return super._install();
    }

    get end() {
        return super._end();
    }
};
