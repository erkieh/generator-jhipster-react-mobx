/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
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
const _ = require('lodash');
const Randexp = require('randexp');
const constants = require('generator-jhipster/generators/generator-constants');
const utils = require('generator-jhipster/generators/utils');

const REACT = constants.SUPPORTED_CLIENT_FRAMEWORKS.REACT;

/* Constants use throughout */
const CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;
const REACT_DIR = constants.ANGULAR_DIR;

const CLIENT_REACT_TEMPLATES_DIR = 'react';

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */

const reactFiles = {
    client: [
        {
            condition: generator => !generator.embedded,
            path: REACT_DIR,
            templates: [
                {
                    file: 'entities/entity-detail.tsx',
                    method: 'processJsx',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}-detail.tsx`
                },
                {
                    file: 'entities/entity.tsx',
                    method: 'processJsx',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}.tsx`
                },
                {
                    file: 'entities/entity.store.ts',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}.store.tsx`
                },
                {
                    file: 'entities/index.tsx',
                    method: 'processJsx',
                    renameTo: generator => `entities/${generator.entityFolderName}/index.tsx`
                }
            ]
        },
        {
            path: REACT_DIR,
            templates: [
                {
                    file: 'entities/entity.model.ts',
                    renameTo: generator => `shared/model/${generator.entityModelFileName}.model.ts`
                }
            ]
        },
        {
            condition: generator => !generator.readOnly && !generator.embedded,
            path: REACT_DIR,
            templates: [
                {
                    file: 'entities/entity-delete-dialog.tsx',
                    method: 'processJsx',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}-delete-dialog.tsx`
                },
                {
                    file: 'entities/entity-update.tsx',
                    method: 'processJsx',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}-update.tsx`
                }
            ]
        }
    ],
    test: [
        {
            condition: generator => generator.protractorTests && !generator.embedded,
            path: CLIENT_TEST_SRC_DIR,
            templates: [
                {
                    file: 'e2e/entities/entity-page-object.ts',
                    renameTo: generator => `e2e/entities/${generator.entityFolderName}/${generator.entityFileName}.page-object.ts`
                },
                {
                    file: 'e2e/entities/entity.spec.ts',
                    renameTo: generator => `e2e/entities/${generator.entityFolderName}/${generator.entityFileName}.spec.ts`
                }
            ]
        },
        {
            condition: generator => generator.protractorTests && !generator.readOnly && !generator.embedded,
            path: CLIENT_TEST_SRC_DIR,
            templates: [
                {
                    file: 'e2e/entities/entity-update-page-object.ts',
                    renameTo: generator => `e2e/entities/${generator.entityFolderName}/${generator.entityFileName}-update.page-object.ts`
                }
            ]
        }
    ]
};

module.exports = {
    writeFiles,
    reactFiles
};

function addEnumerationFiles(generator, templateDir, clientFolder) {
    generator.fields.forEach(field => {
        if (field.fieldIsEnum === true) {
            const enumFileName = _.kebabCase(field.fieldType);
            const enumInfo = {
                ...utils.getEnumInfo(field, generator.clientRootFolder),
                angularAppName: generator.angularAppName,
                packageName: generator.packageName
            };
            if (!generator.skipClient) {
                generator.template(
                    `${generator.fetchFromInstalledJHipster(
                        `entity-client/templates/${templateDir}`
                    )}/${clientFolder}entities/enumerations/enum.model.ts.ejs`,
                    `${clientFolder}shared/model/enumerations/${enumFileName}.model.ts`,
                    generator,
                    {},
                    enumInfo
                );
            }
        }
    });
}

function addSampleRegexTestingStrings(generator) {
    generator.fields.forEach(field => {
        if (field.fieldValidateRulesPattern !== undefined) {
            field.fieldValidateSampleString = new Randexp(field.fieldValidateRulesPattern).gen();
        }
    });
}

function writeFiles() {
    if (this.skipClient) return;
    if (this.protractorTests) {
        addSampleRegexTestingStrings(this);
    }

    let files;
    let destDir;
    let templatesDir;

    if (this.clientFramework === REACT) {
        files = reactFiles;
        destDir = REACT_DIR;
        templatesDir = CLIENT_REACT_TEMPLATES_DIR;
    } else {
        if (!this.embedded) {
            this.addEntityToMenu(this.entityStateName, this.enableTranslation, this.clientFramework, this.entityTranslationKeyMenu);
        }
        return;
    }

    this.writeFilesToDisk(files, this, false, templatesDir);
    addEnumerationFiles(this, templatesDir, destDir);

    if (!this.embedded) {
        this.addEntityToModule(
            this.entityInstance,
            this.entityClass,
            this.entityAngularName,
            this.entityFolderName,
            this.entityFileName,
            this.entityUrl,
            this.clientFramework,
            this.microserviceName
        );
        this.addEntityToMenu(this.entityStateName, this.enableTranslation, this.clientFramework, this.entityTranslationKeyMenu);
    }
}
