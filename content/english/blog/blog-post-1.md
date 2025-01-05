---
title: "Ansible tips"
date: 2018-09-24T11:07:10+06:00
author: Lucas Bonanni
image : "images/blog/blog-post-1.jpg"
bg_image: "images/feature-bg.jpg"
categories: ["ansible"]
tags: ["ansible","tools"]
description: "this is meta description"
draft: false
type: "post"
---
https://www.redhat.com/sysadmin/faster-ansible-playbook-execution
## Managing ansible galaxy roles.
To manage multiple ansible roles that we use from ansible galaxy we can use a requirements.yml with all the roles.
To install the roles from a requirements file you can run:
```bash
ansible-galaxy install -r requirements.yml
```
_requirements.yml_
```yaml
- src: geerlingguy.apache

- src: https://github.com/bennojoy/nginx
  version: master
  name: nginx_role

- src: https://web.localhost.com/files.master.tar.gz
  name: http-role

- src: http://bitbucket.org/willthames/hg-ansible-galaxy
  scm: hg

- src: git@git.localnet.com:mygroup/ansible-base.git
  scm: git
```

## Ansible.cfg
### Enable inventory plugins
You can enable inventory plugins.
You can use `ansible-doc -t inventory -l` to see the list of available plugins. Use `ansible-doc -t inventory <plugin name>` to see plugin-specific documentation`and examples.

```ini
[inventory]
enable_plugins = host_list, scripts, auto, yaml, ini, toml
```
Some of plugins that you could find insteresting are.

```
amazon.aws.aws_ec2
amazon.aws.aws_rds
amazon.aws.aws_mq
azure.azcollection.azure_rm
```
```
ansible.builtin.yaml
ansible.builtin.toml
ansible.builtin.ini
```
```
community.general.nmap                                 
community.docker.docker_machine
community.general.virtualbox
community.general.proxmox
```
I find very interesting the nmap plugin I have give it a try.

The following command will show a graph of the inventory
`ansible-inventory -i demo.aws_ec2.yml --graph`

## Inventory naming conventions
[Completar]

## Using dynamic inventory
`ansible-doc -t inventory -l`

## Optmizations
### Optimize playbook execution

- Change the number of forks
- Apply play-level keywords
- Use a different strategy plugin

### Change the number of forks

```ini
[defaults]
forks = 30
```

### Apply play-level keywords
- serial = number
- serial = percent
- serial = list of numbers of hosts

```yaml
---
- name: Manage webservers
  hosts: webservers
  serial: 5
```
```yaml
---
- name: Manage webservers
  hosts: webservers
  serial:
    - 1
    - 5
    - 10 
```

### Using throttle keyword
```yaml
---
tasks:
  - name: Manage webservers
    command: /sbin/encryptfiles.sh
    throttle: 1
```

### Using a different strategy
```yaml
---
- name: test play
  hosts: webservers
    strategy: free
    tasks:
    ...
```

### Performance tunning 
- Increase forks
- Running tasks in parallel
- Optimize fact gathering
- Optimize SSH

#### Optimize fact gathering
- Disable fact gathering
- Enable partial fact gathering
- Use facts caching

```yaml
---
- name: Manage webservers
  hosts: webservers
  gather_facts: no
```

```yaml
---
- name: Manage webservers
  hosts: webservers
  gather_facts: false
  pre_tasks:
    - setup:
        gather_subset:
          - '|all'
```
```yaml
---
- name: Manage webservers
  hosts: webservers
  gather_facts: false
  pre_tasks:
    - setup:
        gather_subset:
          - '|all'
          - '|any'
          - 'network'
          - 'virtual'
```
### User fact caching

```ìni
[defaults]
gathering = smart
fact_caching_connection = /tmp/facts_cache
fact_caching = jsonfile
fact_caching_timeout = 7200

```

#### Fact cache backends
- jsonfile
- memcached
- memory
- mongodb
- pickle
- redis
- yaml

### Listing fact cache plugins
`ansible-doc -t cache -l`
`ansible-doc -t cache <plugin name>`

### Optimizing SSH
- SSH pipelining
- SSH multiplexing
- SSH preferred authentications
- Replace SSH

#### SSH pipelining
Pipelining reduces the number of connection operations required to execute a module on the remote server, by executing many Ansible modules without actual file transfers.

This can result in a very significant performance improvement when enabled.

However this can conflict with privilege escalation (become). For example, when using sudo operations you must first disable ‘requiretty’ in the sudoers file for the target hosts, which is why this feature is disabled by default.


#### SSH multiplexing
```ini
[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60 -o
PreferredAuthentications=publickey
control_path=%(directory)s/ansible-ssh-%%h-%%p-%%r

```

#### Preferred Authentication
```ini
[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=18000 -o
PreferredAuthentications=publickey
control_path=%(directory)s/ansible-ssh-%%h-%%p-%%r

```

#### Time-profiling playbooks
```ini
callback_whitelist = timer, mail, profile_tasks
```
