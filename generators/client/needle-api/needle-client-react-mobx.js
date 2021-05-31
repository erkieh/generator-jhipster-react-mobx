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

const chalk = require('chalk');

const needleClientBase = require('generator-jhipster/generators/client/needle-api/needle-client-react');

module.exports = class NeedleClientReact extends needleClientBase {
  addEntityToModule(entityInstance, entityClass, entityName, entityFolderName, entityFileName) {
    const indexModulePath = `${this.CLIENT_MAIN_SRC_DIR}app/entities/index.tsx`;
    const indexStorePath = `${this.CLIENT_MAIN_SRC_DIR}app/shared/stores/createStore.ts`;

    const errorMessage = path =>
      `${chalk.yellow('Reference to ') + entityInstance + entityClass + entityFolderName + entityFileName} ${chalk.yellow(
        `not added to ${path}.\n`
      )}`;

    const indexAddRouteImportRewriteFileModel = this.generateFileModel(
      indexModulePath,
      'jhipster-needle-add-route-import',
      this.generator.stripMargin(`|import ${entityName} from './${entityFolderName}';`)
    );
    this.addBlockContentToFile(indexAddRouteImportRewriteFileModel, errorMessage(indexModulePath));

    const indexAddRoutePathRewriteFileModel = this.generateFileModel(
      indexModulePath,
      'jhipster-needle-add-route-path',
      this.generator.stripMargin(`|<ErrorBoundaryRoute path={\`\${match.url}${entityFileName}\`} component={${entityName}} />`)
    );
    this.addBlockContentToFile(indexAddRoutePathRewriteFileModel, errorMessage(indexModulePath));

    const storeAddImportRewriteFileModel = this.generateFileModel(
      indexStorePath,
      'jhipster-needle-add-store-import', // prettier-ignore
      this.generator.stripMargin(`|// prettier-ignore
                    |import ${entityInstance}, {
                    |  ${entityName}Store
                    |} from 'app/entities/${entityFolderName}/${entityFileName}.store';`)
    );
    this.addBlockContentToFile(storeAddImportRewriteFileModel, errorMessage(indexStorePath));

    const storeAddTypeRewriteFileModel = this.generateFileModel(
      indexStorePath,
      'jhipster-needle-add-store-field',
      this.generator.stripMargin(`|  readonly ${entityInstance}Store: ${entityName}Store;`)
    );
    this.addBlockContentToFile(storeAddTypeRewriteFileModel, errorMessage(indexStorePath));

    const storeAddCombineRewriteFileModel = this.generateFileModel(
      indexStorePath,
      'jhipster-needle-add-store-init',
      this.generator.stripMargin(`|  rootStore.${entityInstance}Store = new ${entityName}Store(rootStore);`)
    );
    this.addBlockContentToFile(storeAddCombineRewriteFileModel, errorMessage(indexStorePath));
  }
};
