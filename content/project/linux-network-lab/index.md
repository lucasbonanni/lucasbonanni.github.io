---
title: Linux iptables
date: 2023-10-26
# external_link: https://github.com/lucasbonanni/network-linux-lab
tags:
  - linux
  - iptables
  - vagrant
  - ansible
---
## Objective:
Create a Network lab project with VM configurations, firewall rules, DHCP setup, LVM & RAID storage, automated backups, PXE boot provisioning, and Java application deployment.
[Link to github](https://github.com/lucasbonanni/network-linux-lab)

## Description: 
This lab project, hosted on GitHub, focuses on setting up and configuring multiple virtual machines (VMs) to simulate an enterprise IT infrastructure. It covers **network security, firewall rules, server storage management, automated backups, PXE-based OS provisioning, and Java web application deployment**.  

---

### **1. Network Firewall (cafirewall VM)**  
- Configured as a **router** with **iptables** rules enforcing strict security policies.  
- Default **DROP** policy for all chains in the `FILTER` table.  
- Allows only IT-sector VMs to access it via **SSH**.  
- Enables outbound traffic from **LAN to WAN** while blocking inbound connections.  
- Auto-loads firewall configurations at startup.  

---

### **2. Server Configuration (caservidor VM)**  
- Configured with **5 HDDs**, utilizing **LVM** and **RAID1** for redundancy.  
- Storage validation performed using `lsblk`.  

---

### **3. DHCP Server (isc-dhcp-server)**  
- Assigns dynamic IPs from **192.168.10.171/27** to **192.168.10.190/27**.  
- Reserves specific IPs for critical IT systems (`cacit01` & `cacit02`).  

---

### **4. Automated Local Backups**  
- **Backup script (`backup-data1.sh`)** executes every **5 minutes**.  
- Logs execution details in a structured format.  
- Preserves **permissions, symlinks, ownership**, and timestamps.  
- Uses **compression** and **syncs deletions** to maintain an exact backup replica.  
- Supports an optional **exclusion list** for selective file backup.  

---

### **5. PXE Boot Server on caservidor02**  
- Configures a **PXE boot environment** to deploy a **Debian image** over the network.  
- Ideal for provisioning systems dynamically without the need for local installation media.  

---

### **6. Java Application Deployment on caservidor02**  
- Deploys the **agendasimpleca.war** Java web application.  
- Provides a real-world use case for hosting business applications within a controlled network.  

---

### **7. Marketing Workstations**  
- **4 Debian VMs** with a graphical environment.  
- DHCP-configured IP addresses.  

---

### **8. Optional Client VM**  
- Can be used for direct interaction with `caservidor`.  
- Flexible OS choice for testing purposes.  

---

### **Key Features & Learning Outcomes:**  
✅ Hands-on **network security & firewall administration**  
✅ **PXE boot setup** for automated OS provisioning  
✅ **LVM & RAID** storage management  
✅ **Automated backups with logging & synchronization**  
✅ **Deploying Java applications on Linux servers**  
✅ **Configuring DHCP and dynamic IP allocation**  
✅ **Virtualized enterprise infrastructure simulation**  

This project is a valuable reference for **system engineers, DevOps professionals, and network administrators**, offering a practical approach to real-world infrastructure management.  
