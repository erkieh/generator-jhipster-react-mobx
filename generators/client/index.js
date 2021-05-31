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
const writeFiles = require('./files-react').writeFiles;

module.exports = class extends ClientGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

    const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

    if (!jhContext) {
      this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint jhipster-react-mobx')}`);
    }

    this.configOptions = jhContext.configOptions || {};
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
      },
    };
  }

  get install() {
    return super._install();
  }

  get end() {
    return super._end();
  }
};
