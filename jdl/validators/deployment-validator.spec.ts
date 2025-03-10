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

import { before, it, describe } from 'esmocha';
import { expect } from 'chai';
import { deploymentOptions, applicationTypes, databaseTypes, searchEngineTypes } from '../jhipster/index.js';

import DeploymentValidator from '../validators/deployment-validator.js';

const { MICROSERVICE } = applicationTypes;
const { MONGODB, NO } = databaseTypes;
const { Options } = deploymentOptions;

describe('jdl - DeploymentValidator', () => {
  let validator;

  before(() => {
    validator = new DeploymentValidator();
  });

  describe('validate', () => {
    describe('when no deployment is passed', () => {
      it('should fail', () => {
        expect(() => validator.validate()).to.throw(/^No deployment\.$/);
      });
    });
    describe('when a deployment is passed', () => {
      describe('when having a docker-compose-related deployment', () => {
        describe('without appFolders', () => {
          it('should fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.dockerCompose,
                directoryPath: '../',
                gatewayType: Options.gatewayType.springCloudGateway,
                monitoring: 'no',
                serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
              }),
            ).to.throw(/^The deployment attribute appsFolders was not found.$/);
          });
        });
        describe('without directoryPath', () => {
          it('should fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.dockerCompose,
                appsFolders: ['beers', 'burgers'],
                gatewayType: Options.gatewayType.springCloudGateway,
                monitoring: 'no',
                serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
              }),
            ).to.throw(/^The deployment attribute directoryPath was not found.$/);
          });
        });
        describe('without monitoring', () => {
          it('should not fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.dockerCompose,
                appsFolders: ['beers', 'burgers'],
                directoryPath: '../',
                gatewayType: Options.gatewayType.springCloudGateway,
                serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
              }),
            ).not.to.throw();
          });
        });
        describe('with microservices', () => {
          describe('without gatewayType', () => {
            it('should fail', () => {
              expect(() =>
                validator.validate(
                  {
                    deploymentType: Options.deploymentType.dockerCompose,
                    appsFolders: ['beers', 'burgers'],
                    directoryPath: '../',
                    monitoring: 'no',
                    serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
                  },
                  {
                    applicationType: MICROSERVICE,
                  },
                ),
              ).to.throw(/^A gateway type must be provided when dealing with microservices and the deployment type is docker-compose.$/);
            });
          });
        });
        describe('without serviceDiscoveryType', () => {
          it('should not fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.dockerCompose,
                appsFolders: ['beers', 'burgers'],
                directoryPath: '../',
                monitoring: 'no',
              }),
            ).not.to.throw();
          });
        });
      });
      describe('when having a kubernetes-related deployment', () => {
        describe('without appFolders', () => {
          it('should fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.kubernetes,
                directoryPath: '../',
                kubernetesServiceType: Options.kubernetesServiceType.loadBalancer,
                monitoring: 'no',
                serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
              }),
            ).to.throw(/^The deployment attribute appsFolders was not found.$/);
          });
        });
        describe('without directoryPath', () => {
          it('should fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.kubernetes,
                appsFolders: ['beers', 'burgers'],
                kubernetesServiceType: Options.kubernetesServiceType.loadBalancer,
                monitoring: 'no',
                serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
              }),
            ).to.throw(/^The deployment attribute directoryPath was not found.$/);
          });
        });
        describe('without monitoring, dockerPushCommand, dockerRepositoryName, kubernetesNamespace, kubernetesUseDynamicStorage, kubernetesStorageClassName or istio and an ingressDomain', () => {
          it('should not fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.kubernetes,
                appsFolders: ['beers', 'burgers'],
                directoryPath: '../',
                kubernetesServiceType: Options.kubernetesServiceType.loadBalancer,
                serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
              }),
            ).not.to.throw();
          });
        });
        describe('without kubernetesServiceType', () => {
          it('should fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.kubernetes,
                appsFolders: ['beers', 'burgers'],
                directoryPath: '../',
                serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
              }),
            ).to.throw(/^A kubernetes service type must be provided when dealing with kubernetes-related deployments.$/);
          });
        });
        describe('with istio', () => {
          describe('without an ingressDomain', () => {
            it('should fail', () => {
              expect(() =>
                validator.validate({
                  deploymentType: Options.deploymentType.kubernetes,
                  appsFolders: ['beers', 'burgers'],
                  directoryPath: '../',
                  serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
                  kubernetesServiceType: Options.kubernetesServiceType.loadBalancer,
                  istio: true,
                }),
              ).to.throw(
                /^An ingress domain must be provided when dealing with kubernetes-related deployments, with istio and when the service type is ingress.$/,
              );
            });
          });
        });
        describe('with the kubernetesServiceType being Ingress', () => {
          describe('without an ingressType', () => {
            it('should fail', () => {
              expect(() =>
                validator.validate({
                  deploymentType: Options.deploymentType.kubernetes,
                  appsFolders: ['beers', 'burgers'],
                  directoryPath: '../',
                  kubernetesServiceType: Options.kubernetesServiceType.ingress,
                  serviceDiscoveryType: Options.serviceDiscoveryType.eureka,
                }),
              ).to.throw(
                /^An ingress type is required when dealing with kubernetes-related deployments and when the service type is ingress.$/,
              );
            });
          });
        });
      });
      describe('when having an openshift-related deployment', () => {
        describe('without appFolders', () => {
          it('should fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.openshift,
                directoryPath: '../',
                gatewayType: Options.gatewayType.springCloudGateway,
                openshiftNamespace: 'default',
              }),
            ).to.throw(/^The deployment attribute appsFolders was not found.$/);
          });
        });
        describe('without directoryPath', () => {
          it('should fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.openshift,
                appsFolders: ['beers', 'burgers'],
                monitoring: 'no',
                openshiftNamespace: 'default',
              }),
            ).to.throw(/^The deployment attribute directoryPath was not found.$/);
          });
        });
        describe('without monitoring', () => {
          it('should not fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.openshift,
                appsFolders: ['beers', 'burgers'],
                directoryPath: '../',
                openshiftNamespace: 'default',
              }),
            ).not.to.throw();
          });
        });
        describe('without openshiftNamespace', () => {
          it('should not fail', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.openshift,
                appsFolders: ['beers', 'burgers'],
                directoryPath: '../',
              }),
            ).not.to.throw();
          });
        });
        describe('when there is no prodDatabaseType', () => {
          it('should fail if there is a storageType', () => {
            expect(() =>
              validator.validate(
                {
                  deploymentType: Options.deploymentType.openshift,
                  appsFolders: ['beers', 'burgers'],
                  directoryPath: '../',
                  storageType: Options.storageType.ephemeral,
                },
                { prodDatabaseType: NO },
              ),
            ).to.throw(/^Can't have the storageType option set when there is no prodDatabaseType.$/);
          });
        });
        describe('when the search engine is elasticsearch', () => {
          it('should fail if there is a storageType', () => {
            expect(() =>
              validator.validate(
                {
                  deploymentType: Options.deploymentType.openshift,
                  appsFolders: ['beers', 'burgers'],
                  directoryPath: '../',
                  storageType: Options.storageType.ephemeral,
                },
                { searchEngine: searchEngineTypes.ELASTICSEARCH },
              ),
            ).to.throw(/^Can't have the storageType option set when elasticsearch is the search engine.$/);
          });
        });
        describe('when the monitoring is done with prometheus', () => {
          it('should fail if there is a storageType', () => {
            expect(() =>
              validator.validate({
                deploymentType: Options.deploymentType.openshift,
                appsFolders: ['beers', 'burgers'],
                directoryPath: '../',
                storageType: Options.storageType.ephemeral,
                monitoring: Options.monitoring.prometheus,
              }),
            ).to.throw(/^Can't have the storageType option set when the monitoring is done with prometheus.$/);
          });
        });
        describe('when the prodDatabaseType is set and the storageType is not set', () => {
          it('should not fail', () => {
            expect(() =>
              validator.validate(
                {
                  deploymentType: Options.deploymentType.openshift,
                  appsFolders: ['beers', 'burgers'],
                  directoryPath: '../',
                },
                { prodDatabaseType: MONGODB },
              ),
            ).not.to.throw();
          });
        });
      });
    });
    describe('when passing an unknown deployment type', () => {
      it('should fail', () => {
        expect(() =>
          validator.validate({
            deploymentType: 'whatever',
            appsFolders: ['beers', 'burgers'],
            directoryPath: '../',
          }),
        ).to.throw(/^The deployment type whatever isn't supported.$/);
      });
    });
  });
});
