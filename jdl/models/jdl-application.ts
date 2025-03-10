/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import createApplicationConfigurationFromObject, {
  createApplicationNamespaceConfigurationFromObject,
} from './jdl-application-configuration-factory.js';
import JDLApplicationConfigurationOption from './jdl-application-configuration-option.js';
import JDLApplicationConfiguration from './jdl-application-configuration.js';
import JDLApplicationEntities from './jdl-application-entities.js';
import JDLOptions from './jdl-options.js';

export default class JDLApplication {
  config: JDLApplicationConfiguration;
  namespaceConfigs: Array<JDLApplicationConfiguration>;
  entityNames: any;
  options: any;

  constructor({ config = {}, entityNames = [], namespaceConfigs = {} }: any = {}) {
    this.config = createApplicationConfigurationFromObject(config);
    this.namespaceConfigs = createApplicationNamespaceConfigurationFromObject(namespaceConfigs);
    this.entityNames = new JDLApplicationEntities(entityNames);
    this.options = new JDLOptions();
  }

  setConfigurationOption(option) {
    if (!option) {
      throw new Error('An option has to be passed to set an option.');
    }
    this.config.setOption(option);
  }

  hasConfigurationOption(optionName) {
    return this.config.hasOption(optionName);
  }

  getConfigurationOptionValue(optionName) {
    if (!optionName) {
      throw new Error('An option name has to be passed to get a value.');
    }
    if (!this.config.hasOption(optionName)) {
      return undefined;
    }
    const option = this.config.getOption(optionName);
    return option!.getValue();
  }

  forEachConfigurationOption(passedFunction: (option: JDLApplicationConfigurationOption) => void) {
    this.config.forEachOption(passedFunction);
  }

  forEachNamespaceConfiguration(passedFunction: (option: JDLApplicationConfiguration) => void) {
    for (const namespaceConfig of this.namespaceConfigs) {
      passedFunction(namespaceConfig);
    }
  }

  addEntityName(entityName) {
    if (!entityName) {
      throw new Error('An entity name has to be passed so as to be added to the application.');
    }
    this.entityNames.add(entityName);
  }

  addEntityNames(entityNames: any = []) {
    this.entityNames.addEntityNames(entityNames);
  }

  getEntityNames() {
    return this.entityNames.toArray();
  }

  hasEntityName(entityName) {
    if (!entityName) {
      return false;
    }
    return this.entityNames.has(entityName);
  }

  forEachEntityName(passedFunction) {
    this.entityNames.forEach(passedFunction);
  }

  addOption(jdlOption) {
    if (!jdlOption) {
      throw new Error("Can't add a nil option.");
    }
    this.options.addOption(jdlOption);
  }

  forEachOption(passedFunction) {
    if (!passedFunction) {
      return;
    }
    this.options.forEach(passedFunction);
  }

  getOptionQuantity() {
    return this.options.size();
  }

  toString() {
    let stringifiedApplication = `application {
${this.config.toString(2)}
${this.namespaceConfigs.map(config => `${config.toString(2)}\n`).join()}`;
    if (this.entityNames.size() !== 0) {
      stringifiedApplication += `\n${this.entityNames.toString(2)}\n`;
    }
    if (this.options.size() !== 0) {
      stringifiedApplication += `\n${this.options.toString(2)}\n`;
    }
    stringifiedApplication += '}';
    return stringifiedApplication;
  }
}
