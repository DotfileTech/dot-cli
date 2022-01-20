import { Config } from '../models'
import {groups} from './groups-questions'

export const questions = (config:Config) => [
  groups(config.groups),
  {
    type: 'checkbox',
    name: 'tools',
    message: 'By default all packages are selected but you can deselect them if necessary',
    choices: [
      {
        checked: true,
        type: ["front"],
        name: 'Install gnu-sed',
        value: 'gnused',
      },
      {
        checked: true,
        name: 'Install jq',
        value: 'jq',
      },
      {
        checked: true,
        name: 'Install Nx',
        value: 'nx',
      },
      {
        checked: true,
        name: 'Install Serverless',
        value: 'serverless',
      },
      {
        checked: true,
        name: 'Install mkcert',
        value: 'mkcert',
      },
      {
        checked: true,
        name: 'Install terraform',
        value: 'terraform',
      },
      {
        checked: true,
        name: 'Install aws-cli',
        value: 'awscli',
      },
      {
        checked: true,
        name: 'Install aws-iam-authenticator',
        value: 'awsiamauthenticator',
      },
      {
        checked: true,
        name: 'Install kubectl',
        value: 'kubectl',
      },
      {
        checked: true,
        name: 'Install Helm',
        value: 'helm',
      },
      {
        checked: false,
        name: 'Install Minikube',
        value: 'minikube',
      },
      {
        checked: false,
        name: 'Install docker-sync',
        value: 'dockersync',
      },
    ],
  }
]
