let management = [
  {
    title: 'telnet.telnetTitle',
    to: {
      name: 'telnet',
    },
  },
  {
    title: 'ssh.sshTitle',
    to: {
      name: 'ssh',
    },
  },
  {
    title: 'webServer.title',
    to: {
      name: 'webserver',
    },
  },
  {
    title: 'portIntf.title',
    children: [
      {
        title: 'portIntf.networkTitle',
        to: {
          name: 'networkportinterface',
        }
      },
      {
        title: 'portIntf.serviceTitle',
        to: {
          name: 'serviceportinterface',
        }
      },
      {
        title: 'portIntf.neighborTitle',
        to: {
          name: 'portintfneighbor',
          params: { ver: 'network', pageNum: 1 }
        }
      },
    ]
  },
  {
    title: 'snmp.snmpTitle',
    children: [
      {
        title: 'snmp.userTitle',
        to: {
          name: 'snmpuser',
        }
      },
      {
        title: 'snmp.configTitle',
        to: {
          name: 'snmpconfig',
        }
      },
      {
        title: 'snmp.viewTitle',
        to: {
          name: 'snmpview',
        }
      },
      {
        title: 'snmp.groupTitle',
        to: {
          name: 'snmpgroup',
        }
      },
      {
        title: 'snmp.filterTitle',
        to: {
          name: 'snmpfilter',
        }
      },
      {
        title: 'snmp.hostTitle',
        to: {
          name: 'snmphost',
        }
      },
      {
        title: 'snmp.v3HostTitle',
        to: {
          name: 'snmpv3host',
        }
      },
      {
        title: 'snmp.communityTitle',
        to: {
          name: 'snmpcommunity',
        }
      },
      {
        title: 'snmpTrapSrcInterface.title',
        to: {
          name: 'snmptrapsourceinterface',
        }
      },
    ]
  },
  {
    title: 'rmon.title',
    children: [
      {
        title: 'rmonAlarms.title',
        to: {
          name: 'rmonalarms',
        }
      },
      {
        title: 'rmonHcAlarms.title',
        to: {
          name: 'rmonhcalarms',
        }
      },
      {
        title: 'rmonEvents.title',
        to: {
          name: 'rmonevents',
        }
      },
      {
        title: 'rmonCollectionHistorys.title',
        to: {
          name: 'rmoncollectionhistorys',
        }
      },
      {
        title: 'rmonHistory.title',
        to: {
          name: 'rmonhistory',
        }
      },
      {
        title: 'rmonStatistics.title',
        to: {
          name: 'rmonstatistics',
        }
      },
      {
        title: 'rmonLogs.title',
        to: {
          name: 'rmonlogs',
        }
      },
    ]
  }, 
  {
    title: 'netConf.title',
    to: {
      name: 'netconf',
    },
  },
  {
    title: 'script.title',
    to: {
      name: 'scripts',
    },
  },
  {
    title: 'OVSDB',
    to: {
      name: 'ovsdb',
    }
  },
  {
    title: 'access.portAccessTitle',
    to: {
      name: 'portaccess'
    }
  }, 
  {
    title: 'access.accessTitle',
    children: [
      {
        title: 'access.accessTitle',
        to: {
          name: 'access'
        }
      },
      {
        title: 'access.accessClassTitle',
        to: {
          name: 'managementaccessclass'
        }
      },
      {
        title: 'access.accessListTitle',
        to: {
          name: 'managementaccesslist'
        }
      }
    ]
  },
]

let l2Switch = [
  {
    title: 'vlan.vlan',
    children: [
      {
        title: 'vlan.vlan',
        to: {
          name: 'vlans',
        },
      },
      {
        title: 'MACBasedVlan.title',
        to: {
          name: 'macbasedvlans',
        }
      },
      {
        title: 'vlan.vlanInterface',
        to: {
          name: 'vlaninterfaces',
        },
      },
      {
        title: 'mgmtVlan.title',
        to: {
          name: 'mgmtvlan',
        },
      },
      {
        title: 'dvlan.title',
        to: {
          name: 'dvlan',
        },
      },
      {
        title: 'ipsubnetvlans.title',
        to: {
          name: 'ipsubnetvlans',
        }
      },
      {
        title: 'protovlans.title',
        to: {
          name: 'protovlans',
        }
      },
      {
        title: 'protovlaninterfaces.title',
        to: {
          name: 'protovlaninterfaces',
        }
      },
      {
        title: 'vlan.privateVlan',
        to: {
          name: 'privatevlans',
        }
      },
      {
        title: 'privateVlan.privateVlanType',
        to: {
          name: 'privatevlantype',
        }
      },
      // can set same config in switchport
      // {
      //   title: 'privateVlanInterface.title',
      //   to: {
      //     name: 'privatevlaninterfaces',
      //   }
      // },
      {
        title: 'switchports.title',
        to: {
          name: 'switchports',
        }
      },
    ]
  },
  {
    title: 'portCfg.title',
    children: [
      {
        title: 'portCfg.status',
        to: {
          name: 'port',
          params: {
            type: 'status',
          }
        }
      },
      {
        title: 'protectedport.title',
        children: [
          {
            title: 'protectedport.groupTitle',
            to: {
              name: 'protectedgroups',
            }
          },
          {
            title: 'general.interface',
            to: {
              name: 'protectedports',
            }
          },
        ]
      },
    ]
  },
  {
    title: 'garp.title',
    children: [
      {
        title: 'garp.garpConfig',
        to: {
          name: 'garp',
        }
      },
      {
        title: 'garp.garpStatistic',
        to: {
          name: 'garpstats',
        }
      },
      {
        title: 'garp.mrpConfig',
        to: {
          name: 'mrp',
        }
      },
      {
        title: 'garp.mrpStatistic',
        to: {
          name: 'mrpstats',
        }
      },
    ]
  },
  {
    title: 'loopProtection.loopProtectionTitle',
    to: {
      name: 'loopprotection',
    },
  },
  {
    title: 'portMirror.title',
    children: [
      {
        title: 'portMirror.rspan',
        to: {
          name: 'portmirrorrspan'
        }
      },
      {
        title: 'portMirror.title',
        to: {
          name: 'portmirror',
          params: { sessionNum: 'session1', pageNum: 1 }
        }
      }
    ]
  },
  {
    title: 'fdbs.title',
    children: [
      {
        title: 'fdbs.fdbCount',
        to: {
          name: 'fdbscount',
        },
      },
      {
        title: 'fdbs.fdbInfo',
        to: {
          name: 'fdbs',
        }
      },
    ]
  },
  {
    title: 'pbb.treeTitle',
    children: [
      {
        title: 'pbb.title',
        to: {
          name: 'pbb',
        },
      },
      {
        title: 'pbbIDomains.title',
        to: {
          name: 'pbbidomains',
          params: { type: 'domains', pageNum: 1 }
        },
      },
      {
        title: 'pbbBDomains.title',
        to: {
          name: 'pbbbdomains',
          params: { type: 'domains', pageNum: 1 }
        },
      },
    ]
  },
  {
    title: 'linkDependency.title',
    to: {
      name: 'linkdependency',
    }
  },
  {
    title: 'flowctrl.title',
    to: {
      name: 'flowctrl',
    }
  },
  {
    title: 'udld.udldTitle',
    to: {
      name: 'udld'
    },
  },
  {
    title: 'portSecurity.title',
    to: {
      name: 'portsecurity'
    },
  },
  {
    title: 'sfptransceiver.title',
    to: {
      name: 'sfptransceiver',
      params: { mode: 'diag', pageNum: 1 }
    }
  },
  {
    title: 'stp.stpTitle',
    children: [
      {
        title: 'stp.stpConfig',
        to: {
          name: 'stpconfig'
        }
      },
      {
        title: 'stp.stpInterface',
        to: {
          name: 'stpinterfaces'
        }
      },
      {
        title: 'stp.mstInstancesCfg',
        to: {
          name: 'stpmstinstconfig'
        }
      },
      {
        title: 'stp.pvstPvrstConfigTitle',
        to: {
          name: 'pvstpvrstconfig',
          params: { tab: 'detail' }
        }
      },
      {
        title: 'stp.pvstUplinkFastTitle',
        to: {
          name: 'stpuplinkfast'
        }
      }
    ]
  },
  {
    title: 'lldp.title',
    children: [
      {
        title: 'lldp.lldpConfig',
        to: {
          name: 'lldp',
          params: {
            agentType: "none",
          },
        }
      },
      {
        title: 'lldp.deviceStats',
        to: {
          name: 'lldpstats',
          params: {
            agentType: "none",
          },
        },
      },
      {
        title: 'lldp.localDevSummary',
        to: {
          name: 'lldplocaldevices',
        },
      },
      {
        title: 'lldp.remoteDevSummary',
        to: {
          name: 'lldpremotedevices',
          params: {
            agentType: "none",
          },
        },
      },
    ],
  },
  {
    title: 'portChannel.mainTitle',
    children: [
      {
        title: 'portChannel.subTitle',
        to: {
          name: 'portchannel',
        }
      },
      {
        title: 'portChannelCounter.title',
        to: {
          name: 'portchannelcounters',
        }
      },
      {
        title: 'portChannel.lacpTitle',
        to: {
          name: 'lacpinterfaces',
          params: { type: 'actor' }
        }
      }
    ]
  },
  {
    title: 'cutthroughconfig.title',
    to: {
      name: 'cutthroughconfig',
    }
  },
  {
    title: 'ehm.mainTitle',
    children: [
      {
        title: 'ehm.title',
        to: {
          name: 'ehmgroups',
        }
      },
      {
        title: 'ehm.interfacesTitle',
        to: {
          name: 'ehminterfaces',
        }
      }
    ]
  },
  {
    title: 'vpc.mainTitle',
    children: [
      {
        title: 'vpc.title',
        to: {
          name: 'vpcconfig',
        }
      },
      {
        title: 'vpc.vpcGroupsTitle',
        to: {
          name: 'vpcgroups',
        }
      },
      {
        title: 'vpc.keepAliveTitle',
        to: {
          name: 'vpckeepalive',
        }
      },
      {
        title: 'vpc.roleTitle',
        to: {
          name: 'vpcrole',
        }
      },
      {
        title: 'vpc.vpcConsistencyTitle',
        to: {
          name: 'vpcconsistency',
          params: { tabName: 'global' }
        }
      },
      {
        title: 'vpc.statisticsTitle',
        to: {
          name: 'vpcstatistic',
        }
      }
    ]
  },
  {
    title: 'eeeinterfaces.title',
    to: {
      name: 'eeeinterfaces',
    }
  },
  {
    title: 'spb.mainTitle',
    children: [
      {
        title: 'spb.spbmTitle',
        to: {
          name: 'spbm',
        }
      },
      {
        title: 'spb.spbmIntfTitle',
        to: {
          name: 'spbminterfaces',
        }
      },
      {
        title: 'isis.mainTitle',
        to: {
          name: 'isis',
        }
      },
      {
        title: 'isis.intfTitle',
        to: {
          name: 'isisinterfaces',
        }
      },
      {
        title: 'isisLsdbs.title',
        to: {
          name: 'isislsdbs',
        }
      },
      {
        title: 'isisSpfResults.title',
        to: {
          name: 'isisspfresults',
        }
      },
      {
        title: 'isisNeighbors.title',
        to: {
          name: 'isisneighbors',
        }
      },
    ]
  },
  {
    title: 'macfilter.title',
    to: {
      name: 'macfilter',
      params: { type: 'all' }
    },
  },
];

let dhcp = [
  {
    title: 'dhcp.dhcpClient',
    children: [
      {
        title: 'dhcp.dhcpClientConf',
        to: {
          name: 'dhcpv4client'
        }
      },
      {
        title: 'dhcp.dhcpClientLeaseTitle',
        to: {
          name: 'dhcpv4clientlease'
        }
      },
      {
        title: 'dhcp.dhcpv6ClientTitle',
        to: {
          name: 'dhcpv6client',
          params: { port: '0/1' }
        }
      },
      {
        title: 'dhcp.dhcpv6ClientInterfaceTitle',
        to: {
          name: 'dhcpv6clientinterfaces'
        }
      }
    ]
  },
  {
    title: 'dhcp.dhcpv6Statistic',
    to: {
      name: 'dhcpstatistic',
      params: { ver: 'network' }
    }
  },
  {
    title: 'dhcp.dhcpSnooping',
    children: [
      {
        title: 'dhcp.dhcpSnoopingTitle',
        to: {
          name: 'dhcpsnooping',
          params: { ver: 'v4' }
        }
      },
      {
        title: 'dhcp.dhcpSnoopingIntfTitle',
        to: {
          name: 'dhcpsnoopinginterface',
          params: { ver: 'v4', pageNum: 1 }
        }
      },
      {
        title: 'dhcp.dhcpSnoopingBindTitle',
        to: {
          name: 'dhcpsnoopingbinding',
          params: { ver: 'v4', pageNum: 1 }
        }
      },
      {
        title: 'dhcp.dhcpSnoopingStatTitle',
        to: {
          name: 'dhcpsnoopingstats',
          params: { ver: 'v4', pageNum: 1 }
        }
      }
    ]
  },
  {
    title: 'dhcp.dhcpRelay',
    to: {
      name: 'dhcprelay',
      params: { ver: 'v4' }
    }
  },
  {
    title: 'dhcp.dhcpL2RelayTitle',
    children: [
      {
        title: 'dhcp.dhcpL2RelayTitle',
        to: {
          name: 'dhcpl2relay'
        },
      },
      {
        title: 'dhcp.dhcpL2RelayVlansTitle',
        to: {
          name: 'dhcpl2relayvlans'
        },
      },
      {
        title: 'dhcp.dhcpL2RelayStatsTitle',
        to: {
          name: 'dhcpl2relayinterfacestats',
          params: { port: 'all' }
        },
      },
    ]
  },
  {
    title: 'dhcpServer.title',
    children: [
      {
        title: 'dhcpServer.title',
        to: {
          name: 'dhcpserver'
        }
      },
      {
        title: 'dhcpServer.dhcpServerDomain',
        to: {
          name: 'dhcpserverdomain'
        }
      },
      {
        title: 'dhcpServer.dhcpServerDns',
        to: {
          name: 'dhcpserverdns'
        }
      },
      {
        title: 'dhcpServer.dhcpServerInterfacesTitle',
        to: {
          name: 'dhcpserverinterfaces'
        }
      },
      {
        title: 'dhcpServer.dhcpV6BindingTitle',
        to: {
          name: 'dhcpv6binding',
        }
      },
    ]
  },
]
let security = [
  {
    title: 'sourceGuard.title',
    children: [
      {
        title: 'sourceGuard.v4Title',
        to: {
          name: 'ipsourceguard',
          params: { ver: 'v4' }
        }
      },
      {
        title: 'sourceGuard.v6Title',
        to: {
          name: 'ipsourceguard',
          params: { ver: 'v6' }
        }
      },
      {
        title: 'sourceGuard.verifyTitle',
        to: {
          name: 'ipsourceguardverify',
          params: { ver: 'v4' }
        }
      }
    ]
  },
  {
    title: 'arp.dynamicArpInspection',
    children: [
      {
        title: 'arpAcls.title',
        to: {
          name: 'arpacls',
        },
      },
      {
        title: 'arpInspects.title',
        to: {
          name: 'arpinspects',
        },
      },
      {
        title: 'arpInspectValidate.title',
        to: {
          name: 'arpinspectvalidate',
        },
      },
      {
        title: 'arpInspectTrustLimit.title',
        to: {
          name: 'arpinspecttrustlimit',
        },
      },
      {
        title: 'arpInspectStats.title',
        to: {
          name: 'arpinspectstats',
        },
      },
    ]
  },
  {
    title: 'stormControl.title',
    children: [
      {
        title: 'stormControl.stormControlConfig',
        to: {
          name: 'stormcontrolconfig',
        }
      },
      {
        title: 'stormControl.stormControlInterfaces',
        to: {
          name: 'stormcontrolinterfaces',
        }
      }
    ]
  },
  {
    title: 'dosConfig.title',
    to: {
      name: 'dosconfig',
    },
  },
  {
   title: 'ldap.ldapTitle',
   to: {
     name: 'ldap',
   },
 },
  {
    title: 'tacacsConfig.title',
    to: {
      name: 'tacacsconfig',
    },
  },
  {
    title: 'radius.title',
    children: [
      {
        title: 'radius.subTitle',
        to: {
          name: 'radius',
        }
      },
      {
        title: 'radius.statsTitle',
        to: {
          name: 'radiusstatistics',
          params: {
            type: 'radiusaccountings',
          }
        }
      },
    ]
  },
  // {
  //   title: 'dot1xSupplicant.title',
  //   to: {
  //     name: 'dot1xsupplicant',
  //   },
  // },
  {
    title: 'dot1x.title',
    children: [
      {
        title: 'dot1x.dot1xStatusTitle',
        to: {
          name: 'dot1x',
        }
      },
      {
        title: 'dot1x.dot1xStatsTitle',
        to: {
          name: 'dot1xstats',
          params: {
            interface: '0/1'
          },
        }
      },
      {
        title: 'dot1x.interfaceTitle',
        to: {
          name: 'dot1xinterfaces',
        }
      },
      {
        title: 'dot1x.historyTitle',
        to: {
          name: 'dot1xauthhistory',
        }
      },
      {
        title: 'dot1xClients.title',
        to: {
          name: 'dot1xclients',
        }
      },
    ]
  },
  {
    title: 'userAccount.title',
    children: [
      {
        title: 'userAccount.userAccounts',
        to: {
          name: 'localuseraccounts'
        }
      },
      {
        title: 'access.password',
        to: {
          name: 'password'
        }
      },
      {
        title: 'privilegeLevels.title',
        to: {
          name: 'privilegelevels'
        }
      },
      {
        title: 'silentTime.title',
        to: {
          name: 'silenttime',
        }
      },
    ]
  },
  {
    title: 'aaa.title',
    children: [
      {
        title: 'authentication.title',
        to: {
          name: 'authentication'
        }
      },
      {
        title: 'authorization.title',
        to: {
          name: 'authorization'
        }
      },
      {
        title: 'accounting.title',
        to: {
          name: 'accounting'
        }
      },
      {
        title: 'accountingStat.title',
        to: {
          name: 'accountingstat'
        }
      },
      {
        title: 'iasUsers.title',
        to: {
          name: 'iasusers'
        }
      },
    ]
  },
  {
    title: 'errdisable.title',
    children: [
      {
        title: 'errdisable.title',
        to: {
          name: 'errdisable'
        }
      },
      {
        title: 'errdisableInterfaces.title',
        to: {
          name: 'errdisableinterfaces'
        }
      },
    ]
  },
]

let system = [
  {
    title: 'firmware.title',
    to: {
      name: 'firmware',
    }
  },
  {
    title: 'traceroute.title',
    to: {
      name: 'traceroute'
    }
  },
  {
    title: 'ping.title',
    to: {
      name: 'execping',
      params: {
        ver: 'ipv4'
      },
    }
  },
  {
    title: 'cliBanner.title',
    to: {
      name: 'clibanner'
    }
  },
  {
    title: 'autoDiscovery.title',
    to: {
      name: 'autodiscovery',
    },
  },
  {
    title: 'usb.title',
    children: [
      {
        title: 'usb.deviceTitle',
        to:{
          name: 'usb'
        },
      },
      {
        title: 'usb.dirTitle',
        to:{
          name: 'usbdir',
        },
      }
    ]
  },
  {
    title: 'multiconfig.title',
    to: {
      name: 'multiconfig'
    }
  },
  {
    title: 'sflow.title',
    to: {
      name: 'sflow',
      params: {
        ver: 'config'
      }
    },
  },
  {
    title: 'logging.title',
    children: [
      {
        title: 'logging.globalConfig',
        to:{
          name: 'logging',
          params: {
            loggingType:'config',
          },
        },
      },
      {
        title: 'logging.trapLogs',
        to:{
          name: 'loggingtraplogs',
        },
      },
      {
        title: 'logging.hosts',
        to:{
          name: 'logginghosts',
        },
      },
      {
        title: 'logging.copyTitle',
        to:{
          name: 'loggingcopy',
        },
      },
    ],
  },
  {
    title: 'clock.title',
    to: {
      name: 'clock'
    }
  },
  {
    title: 'sntp.title',
    to: {
      name: 'sntp',
    },
  },
  {
    title: 'statistics.title',
    children: [
      {
        title: 'interfaceStats.title',
        to: {
          name: 'interfacestats',
          params: { ver: 'interface', intfNum: '0/1' }
        },
      },
      {
        title: 'counterStats.title',
        to: {
          name: 'counterstats',
        },
      },
    ]
  },
  {
    title: 'terminalLength.title',
    to: {
      name: 'terminallength',
    },
  },
  {
    title: 'process.title',
    to: {
      name: 'process',
      params: {
        type: 'applist',
      }
    }
  },
  {
    title: 'cpuThreshold.title',
    to: {
      name: 'cputhreshold',
    },
  },
  {
    title: 'sysInfo.title',
    to: {
      name: 'systeminfo',
    }
  },
  {
    title: 'hardware.treeTitle',
    children: [
      {
        title: 'hardware.title',
        to: {
          name: 'hardware',
        },
      },
      {
        title: 'environment.title',
        to: {
          name: 'environment',
        },
      },
      {
        title: 'systemLed.sysLed',
        to: {
          name: 'systemled',
        },
      },
    ]
  },
  {
    title: 'locatorLed.title',
    to: {
      name: 'locatorled'
    }
  },
  {
    title: 'config.title',
    to: {
      name: 'configuration'
    }
  },
  {
    title: 'application.title',
    to: {
      name: 'application',
    },
  },
  {
    title: 'ptp.ptpInterface',
    to: {
      name: 'ptpinterfaces',
    },
  },
  {
    title: 'llmnr.title',
    to: {
      name: 'llmnr'
    },
  },
  {
    title: 'dnsClient.title',
    to: {
      name: 'dnsclient'
    },
  },
]

let l3 = [
  {
    title: 'arp.title',
    children:[
      {
        title: 'arp.settingTitle',
        to: {
          name: 'arpsetting'
        },
      },
      {
        title: 'arp.cacheTitle',
        to: {
          name: 'arpcache',
          params: {
            type: 'default'
          }
        },
      },
      {
        title: 'arp.cachebriefTitle',
        to: {
          name: 'arpcachebrief',
          params: {
            type: 'default'
          }
        },
      },
      {
        title: 'arpSwitch.title',
        to: {
          name: 'arpswitch'
        },
      },
    ]
  },
  {
    title: 'irdp.title',
    to: {
      name: 'irdp'
    }
  },
  {
    title: 'routingPolicy.treeTitle',
    children: [
      {
        title: 'prefixlists.title',
        to: {
          name: 'prefixlists',
        }
      },
      {
        title: 'ipv6prefixlists.title',
        to: {
          name: 'ipv6prefixlists',
        }
      },
      {
        title: 'routeMaps.title',
        to: {
          name: 'routemaps',
        }
      },
      {
        title: 'policyRouteMaps.title',
        to: {
          name: 'policyroutemaps',
        }
      }
    ]
  },
  {
    title: 'vlanRouting.title',
    to: {
      name: 'virtuallanrouting'
    }
  },
  {
    title: 'loopbackInterface.title',
    to: {
      name: 'loopbackinterface',
      params: { 
        tabName: 'default'
      }
    }
  },
  {
    title: 'ipHelper.title',
    children: [
      {
        title: 'ipHelper.title',
        to: {
          name: 'iphelper',
          params: {
            tabName: 'default'
          }
        }
      },
      {
        title: 'ipHelperStats.title',
        to: {
          name: 'iphelperstats'
        }
      },
    ]
  },
  {
    title: 'ospf.title',
    children: [
      {
        title: 'ospf.globalConfig',
        to: {
          name: 'ospfglobal',
          params: { 
            type: 'defaultInfo'
          }
        }
      },
      {
        title: 'ospf.intf',
        to: {
          name: 'ospfinterface',
        }
      },
      {
        title: 'ospf.intfStats',
        to: {
          name: 'ospfinterfacestats',
          params: { port: '0/1' }
        }
      },
      {
        title: 'ospf.areaTitle',
        to: {
          name: 'ospfarea',
          params: {
            tab: 'defaultinfo'
          }
        }
      },
      {
        title: 'ospf.networkArea',
        to: {
          name: 'ospfnetworkarea',
          params: {
            tab: 'defaultinfo'
          }
        }
      },
      {
        title: 'ospf.areaRanges',
        to: {
          name: 'ospfarearanges',
          params: {
            tab: 'defaultinfo'
          }
        }
      },
      {
        title: 'ospf.ospfVirtualLink',
        to: {
          name: 'ospfvirtuallink',
          params: {
            tab: 'defaultinfo'
          }
        }
      },
      {
        title: 'ospf.policiesTitle',
        to: {
          name: 'ospfpolicies',
          params: {
            tab: 'defaultinfo'
          }
        }
      },
      {
        title: 'ospf.abrTitle',
        to: {
          name: 'ospfabr',
          params: {
            tab: 'defaultinfo'
          }
        }
      },
      {
        title: 'ospf.asbrTitle',
        to: {
          name: 'ospfasbr',
          params: {
            tab: 'defaultinfo'
          }
        }
      },
      {
        title: 'ospf.lsaGroupTitle',
        to: {
          name: 'ospflsagroup',
          params:{
            tab: 'defaultinfo'
          }
        }
      },
      {
        title: 'ospf.neighborsTitle',
        to: {
          name: 'ospfneighbors',
          params: {
            type: 'default',
            prePageNum: 1,
            pageNum: 1,
            vrfName: 'default'
          }
        }
      },
      {
        title: 'ospf.lsdbTitle',
        to: {
          name: 'ospfdatabasesummary',
          params: {
            tab: 'defaultinfo'
          }
        }
      },
      {
        title: 'ospf.statsTitle',
        to: {
          name: 'ospfstats',
          params: { 
            type: 'default'
          }
        }
      },
      {
        title: 'ospf.stubRouterTitle',
        to: {
          name: 'ospfstubrouter',
          params: {
            tab: 'defaultinfo',
            pageNum: 1
          }
        }
      },
      {
        title: 'ospf.trafficTitle',
        to: {
          name: 'ospftraffic',
          params: {
            tabName: 'defaultinfo',
            pageNum: 1
          }
        }
      },
      {
        title: 'ospf.trapFlagTitle',
        to: {
          name: 'ospftrapflag',
        }
      },
    ]
  },
  {
    title: 'ospfV3.title',
    children: [
      {
        title: 'ospfV3.title',
        to: {
          name: 'ospfv3',
        }
      },
      {
        title: 'ospfV3Policies.title',
        to: {
          name: 'ospfv3policies',
        }
      },
      {
        title: 'ospfV3VirtualLinks.title',
        to: {
          name: 'ospfv3virtuallinks',
        }
      },
      {
        title: 'ospfV3Area.title',
        to: {
          name: 'ospfv3area',
        }
      },
      {
        title: 'ospfV3Interface.title',
        to: {
          name: 'ospfv3interface',
        }
      },
      {
        title: 'ospfV3InterfaceStats.title',
        to: {
          name: 'ospfv3interfacestats',
          params: { port: '0/1' }
        }
      },
      {
        title: 'ospfV3StubRouter.title',
        to: {
          name: 'ospfv3stubrouter',
        }
      },
      {
        title: 'ospfV3AreaRanges.title',
        to: {
          name: 'ospfv3arearanges',
        }
      },
      {
        title: 'ospfV3Lsdb.title',
        to: {
          name: 'ospfv3lsdb',
          params: { 
            filterType: 'default'
          }
        }
      },
      {
        title: 'ospfV3Neighbors.title',
        to: {
          name: 'ospfv3neighbors',
        }
      },
      {
        title: 'ospfV3LsaGroup.title',
        to: {
          name: 'ospfv3lsagroup',
        }
      },
      {
        title: 'ospfV3Abr.title',
        to: {
          name: 'ospfv3abr',
        },
      },
      {
        title: 'ospfV3.ospfV3AsbrTitle',
        to: {
          name: 'ospfv3asbr',
        }
      },
      {
        title: 'ospfV3Stats.title',
        to: {
          name: 'ospfv3stats',
        }
      },
      {
        title: 'ospfV3DatabaseSummary.title',
        to: {
          name: 'ospfv3databasesummary',
        }
      }
    ]
  },
  {
    title: 'ipBrief.treeTitle',
    children: [
      {
        title: 'ipBrief.title',
        to: {
          name: 'ipbrief',
          params: { type: 'default'}
        }
      },
      {
        title: 'ipInterfaces.title',
        to: {
          name: 'ipinterfaces',
        }
      },
      {
        title: 'ipecmp.title',
        to: {
          name: 'ipecmp',
        }
      },
      {
        title: 'ipEcmpGroups.title',
        to: {
          name: 'ipecmpgroups',
          params: { tabName: 'default'}
        }
      },
      {
        title: 'ipRoute.title',
        to: {
          name: 'iproute',
          params: { tabName: 'default'}
        }
      },
      {
        title: 'ipRouteSummary.title',
        to: {
          name: 'iproutesummary',
        }
      },
      {
        title: 'ipRoutePreferences.title',
        to: {
          name: 'iproutepreferences',
          params: { type: 'defaultInfo'}
        }
      },
      {
        title: 'ipHeapSummary.title',
        to: {
          name: 'ipheapsummary',
        }
      },
      {
        title: 'ipStats.title',
        to: {
          name: 'ipstats',
          params: { type: 'defaultInfo', pageNum: 1 }
        }
      }
    ]
  },
  {
    title: 'bgp.title',
    children: [
      {
        title: 'bgp.config',
        to: {
          name: 'bgp',
          params: { ver: 'ipv4', vrf: 'none', pageNum: 1 }
        }
      },
      {
        title: 'bgp.bgpFastExternalFailover',
        to: {
          name: 'bgpinterfaces',
          params: { pageNum: 1 }
        }
      },
      {
        title: 'bgp.redistributionTitle',
        to: {
          name: 'bgpredistribution',
          params: { ver: 'ipv4', vrf: 'none', pageNum: 1 }
        }
      },
      {
        title: 'bgp.routeDistance',
        to: {
          name: 'bgproutedistance',
          params: { ver: 'ipv4', vrf: 'none', pageNum: 1 }
        }
      },
      {
        title: 'bgp.peerTitle',
        to: {
          name: 'bgppeer',
          params: { ver: 'ipv4', vrf: 'none', showDetail: 0, index:0 ,pageNum: 1 }
        }
      },
      {
        title: 'bgp.peerPolicyTitle',
        to: {
          name: 'bgppeerpolicy',
          params: { ver: 'ipv4', vrf: 'none', showDetail: 0, index:0, afIndex:0, pageNum: 1 }
        }
      },
      {
        title: 'bgp.aggregationTitle',
        to: {
          name: 'bgpaggregation',
          params: { ver: 'ipv4', pageNum: 1 }
        }
      },
      {
        title: 'bgp.listenRangeTitle',
        to: {
          name: 'bgplistenrange',
          params: { ver: 'ipv4', pageNum: 1 }
        }
      },
      {
        title: 'bgp.templateTitle',
        to: {
          name: 'bgptemplate',
        }
      },
      {
        title: 'bgp.routeReflection',
        to: {
          name: 'bgproutereflection',
          params: { ver: 'ipv4' }
        }
      },
      {
        title: 'bgp.traffic',
        to: {
          name: 'bgptraffic',
          params: { ver: 'ipv4' }
        }
      },
      {
        title: 'bgp.updategroupTitle',
        to: {
          name: 'bgpupdategroup',
          params: { ver: 'ipv4', vrf: 'none', pageNum: 1 }
        }
      },
      {
        title: 'bgp.stats',
        to: {
          name: 'bgpstats',
          params: { ver: 'ipv4', vrf: 'none', pageNum: 1 }
        }
      },
      {
        title: 'bgp.routingTable',
        to: {
          name: 'bgproutes',
          params: { ver: 'ipv4', vrf: 'none', displayOpt: 'none', displayOptValue: 'none', pageNum: 1 }
        }
      },
      {
        title: 'bgp.communityTitle',
        to: {
          name: 'bgpcommunity',
          params: { ver: 'ipv4', vrf: 'none', exactMatch: 'false', listName: 'none', pageNum: 1 }
        }
      },
      {
        title: 'communityLists.title',
        to: {
          name: 'communitylists',
          params: { pageNum: 1 }
        }
      },
      {
        title: 'extcommunityLists.title',
        to: {
          name: 'extcommunitylists',
          params: { pageNum: 1 }
        }
      },
      {
        title: 'asPathAcl.title',
        to: {
          name: 'aspathacl',
          params: { pageNum: 1 }
        }
      }
    ]
  },
  {
    title: 'ipv6Routing.title',
    children: [
      {
        title: 'ipv6Routing.ipv6BriefTitle',
        to: {
          name: 'ipv6brief'
        }
      },
      {
        title: 'ipv6Interface.ipv6InterfaceTitle',
        to: {
          name: 'ipv6interfaces'
        }
      },      
      {
        title: 'ipv6Raguard.ipv6RaguardTitle',
        to: {
          name: 'ipv6raguard'
        }
      },
      {
        title: 'ipv6Neighbors.ipv6NeighborsTitle',
        to: {
          name: 'ipv6neighbors'
        }
      },
      {
        title: 'ipv6Route.ipv6RouteTitle',
        to: {
          name: 'ipv6route'
        }
      },
      {
        title: 'ipv6EcmpGroups.ipv6EcmpGroupsTitle',
        to: {
          name: 'ipv6ecmpgroups'
        }
      },
      {
        title: 'ipv6RouteSummary.ipv6RouteSummaryTitle',
        to: {
          name: 'ipv6routesummary'
        }
      },
      {
        title: 'ipv6SnoopingCounters.ipv6SnoopingCountersTitle',
        to: {
          name: 'ipv6snoopingcounters'
        }
      },
      {
        title: 'ipv6Traffic.title',
        to: {
          name: 'ipv6traffic'
        }
      },
    ]
  },
  {
    title: 'vrrp.title',
    children: [
      {
        title: 'vrrp.title',
        to: {
          name: 'vrrpstats'
        },
      },
      {
        title: 'vrrpInterface.title',
        to: {
          name: 'vrrpinterface'
        },
      },
    ]
  },
  {
    title: 'rip.title',
    children: [
      {
        title: 'rip.config',
        to: {
          name: 'rip'
        },
      },
      {
        title: 'rip.interfaces',
        to: {
          name: 'ripinterfaces'
        },
      },
      {
        title: 'rip.ripPassive',
        to: {
          name: 'rippassive'
        },
      },
      {
        title: 'rip.summaryaddresses',
        to: {
          name: 'ripsummaryaddresses'
        },
      },
      {
        title: 'rip.neighbors',
        to: {
          name: 'ripneighbors'
        },
      },
      {
        title: 'rip.redistributions',
        to: {
          name: 'ripredistributions'
        },
      },
      {
        title: 'rip.ripStats',
        to: {
          name: 'ripstats'
        },
      },
      {
        title: 'rip.database',
        to: {
          name: 'ripdatabase'
        },
      },
    ]
  },
  {
    title: 'rip.ngTitle',
    children: [
      {
        title: 'rip.ngTitle',
        to: {
          name: 'ripng',
        }
      },
      {
        title: 'rip.ngInterfaces',
        to: {
          name: 'ripnginterfaces',
        }
      },
      {
        title: 'rip.ngRedistributions',
        to: {
          name: 'ripngredistributions',
        }
      },
      {
        title: 'rip.ngFilter',
        to: {
          name: 'ripngfilters',
        }
      },
      {
        title: 'rip.ngStats',
        to: {
          name: 'ripngstats',
        }
      },
      {
        title: 'rip.ngDatabase',
        to: {
          name: 'ripngdatabase',
        }
      },
    ]
  },
  {
    title: 'vrfs.vrf',
    children: [
      {
        title: 'vrfs.title',
        to: {
          name: 'vrfs',
        }
      },
      {
        title: 'vrfs.vrfInterface',
        to: {
          name: 'vrfinterfaces',
        }
      }
    ]
  },
]

let multicast = [
  {
    title: 'snooping.igmpSnooping',
    children:[
      {
        title: 'snooping.igmpSnooping',
        to: {
          name: 'snooping',
          params: {
            family: 'igmp',
            intfType: 'interfaces',
          },
        },
      },
      {
        title: 'snooping.igsquerier',
        to: {
          name: 'snoopingqueriers',
          params: {
            family: 'igmp',
          },
        },
      },
      {
        title: 'snooping.igsssms',
        to: {
          name: 'snoopingssms',
          params: {
            family: 'igmp',
            entryType: 'mfdb',
          },
        },
      },
      {
        title: 'snooping.igmpmrouter',
        to: {
          name: 'snoopingmrouter',
          params: {
            family: 'igmp',
          },
        },
      },
    ]
  },
  {
    title: 'snooping.mldSnooping',
    children:[
      {
        title: 'snooping.mldSnooping',
        to: {
          name: 'snooping',
          params: {
            family: 'mld',
            intfType: 'interfaces',
          },
        },
      },
      {
        title: 'snooping.mldsquerier',
        to: {
          name: 'snoopingqueriers',
          params: {
            family: 'mld',
          },
        },
      },
      {
        title: 'snooping.mldsssms',
        to: {
          name: 'snoopingssms',
          params: {
            family: 'mld',
            entryType: 'mfdb',
          },
        },
      },
      {
      title: 'snooping.mldmrouter',
        to: {
          name: 'snoopingmrouter',
          params: {
            family: 'mld',
          },
        },
      },
    ]
  },
  {
    title: 'mgmdConfig.igmp',
    children:[
      {
        title: 'mgmdInterfaces.igmpInterfaces',
        to: {
          name: 'mgmdinterfaces',
          params: {
            family: 'igmp',
            interface: 'cfg'
          },
        },
      },
      {
        title: 'mgmdStats.igmpStats',
        to: {
          name: 'mgmdstats',
          params: {
            family: 'igmp',
          },
        },
      }
    ]
  },
  {
    title: 'mgmdConfig.mld',
    children:[
      {
        title: 'mgmdInterfaces.mldInterfaces',
        to: {
          name: 'mgmdinterfaces',
          params: {
            family: 'mld',
            interface: 'cfg'
          },
        },
      },
      {
        title: 'mgmdStats.mldStats',
        to: {
          name: 'mgmdstats',
          params: {
            family: 'mld',
          },
        },
      }
    ]
  },
  {
    title: 'dvmrp.title',
    children:[
      {
        title: 'dvmrp.configTitle',
        to: {
          name: 'dvmrp',
          params: {
            interface: 'cfg',
          },
        },
      },
      {
        title: 'dvmrpPrune.title',
        to: {
          name: 'dvmrpprunes',
        },
      },
      {
        title: 'dvmrpRoute.title',
        to: {
          name: 'dvmrproutes',
        },
      },
      {
        title: 'dvmrpNeighbor.title',
        to: {
          name: 'dvmrpneighbors',
        },
      },
      {
        title: 'dvmrpNexthop.title',
        to: {
          name: 'dvmrpnexthop',
        },
      },
    ]  
  },
  {
    title: 'mfdbs.title',
    to: {
      name: 'mfdbs',
    }
  },
  {
    title: 'mcast.title',
    children:[
      {
        title: 'mcast.configTitle',
        to: {
          name: 'mcastconfig',
        },
      },
      {
        title: 'mcast.mcastsBoundary',
        to: {
          name: 'mcasts',
        },
      },
      {
        title: 'mcast.mrouteTitle',
        to: {
          name: 'mroutes',
          params: {
            pageNum: 1,
          }
        },
      },
      {
        title: 'mcast.mcastStaticRoute',
        to: {
          name: 'mroutestatic',
        },
      },
      {
        title: 'mcast.mroutev6Title',
        to: {
          name: 'ipv6mroutes',
          params: {
            pageNum: 1,
          }
        },
      },
      {
        title: 'mcast.mroutev6StaticTitle',
        to: {
          name: 'ipv6mroutestatic',
        },
      },
      {
        title: 'mcast.mfcTitle',
        to: {
          name: 'mfc',
        },
      },
      {
        title: 'mcast.mfcCacheTitle',
        to: {
          name: 'mfccache',
        },
      }
    ]
  },
  {
    title: 'mgmdProxy.igmpTitle',
    children:[
      {
        title: 'mgmdProxy.igmpTitle',
        to: {
          name: 'mgmdproxy',
          params: {
            family: 'igmp',
          }
        },
      },
      {
        title: 'mgmdProxyGroups.igmpTitle',
        to: {
          name: 'mgmdproxygroups',
          params: { 
            family: 'igmp',
            groupAddressId: 'none',
            pageNum: 1 
          }
        },
      },
      {
        title: 'mgmdProxyStats.igmpTitle',
        to: {
          name: 'mgmdproxystats',
          params: {
            family: 'igmp',
          }
        },
      },
    ]
  },
  {
    title: 'mgmdProxy.mldTitle',
    children:[
      {
        title: 'mgmdProxy.mldTitle',
        to: {
          name: 'mgmdproxy',
          params: {
            family: 'mld',
          }
        },
      },
      {
        title: 'mgmdProxyGroups.mldTitle',
        to: {
          name: 'mgmdproxygroups',
          params: { 
            family: 'mld',
            groupAddressId: 'none',
            pageNum: 1 
          }
        },
      },
      {
        title: 'mgmdProxyStats.mldTitle',
        to: {
          name: 'mgmdproxystats',
          params: {
            family: 'mld',
          }
        },
      },
    ]
  },
  {
    title: 'pim.title',
    children:[
      {
        title: 'pim.config',
        to: {
          name: 'pimconfig',
          params: {
            ver: 'v4'
          },
        }
      },
      {
        title: 'pim.ssm',
        to: {
          name: 'pimssm',
          params: { ver: 'v4', pageNum: 1 }
        }
      },
      {
        title: 'pim.bsr',
        to: {
          name: 'pimbsr',
          params: { ver: 'v4' }
        }
      },
      {
        title: 'pim.rpcandidate',
        to: {
          name: 'pimrpcandidate',
          params: { ver: 'v4', pageNum: 1 }
        }
      },
      {
        title: 'pim.rpstatic',
        to: {
          name: 'pimrpstatic',
          params: { ver: 'v4', pageNum: 1 }
        }
      },
      {
        title: 'pim.rpMapping',
        to: {
          name: 'pimrpset',
          params: { ver: 'v4', pageNum: 1 }
        }
      },
      {
        title: 'pim.rpHash',
        to: {
          name: 'pimrphash',
          params: { ver: 'v4', pageNum: 1 }
        }
      },
      {
        title: 'pim.neighbors',
        to: {
          name: 'pimneighbors',
          params: { ver: 'v4', pageNum: 1 }
        }
      },
      {
        title: 'pim.stats',
        to: {
          name: 'pimstats',
          params: { ver: 'v4', pageNum: 1 }
        }
      },
    ]
  },
]

let qos = [
  {
    title: 'dot1p.dot1pTitle',
    to: {
      name: 'dot1p',
    },
  },
  {
    title: 'cos.cosTitle',
    children:[
      {
        title: 'cos.cosManageTitle',
        children:[
          {
            title: 'cos.globalConfig',
            to: {
              name: 'cosmanage',
            }
          },
          {
            title: 'cos.cosIntfManageTitle',
            to: {
              name: 'cosmanageinterfaces'
            }
          }
        ]
      },
      {
        title: 'cos.cosMappingTitle',
        children:[
          {
            title: 'cos.cosGlobalMappingTitle',
            to: {
              name: 'cosmapping',
            }
          },
          {
            title: 'cos.cosIntfMappingTitle',
            to: {
              name: 'cosmappinginterface'
            }
          }
        ]
      },
      {
        title: 'cos.cosRandomDetectTitle',
        children:[
          {
            title: 'cos.cosGlobalRandomDetectTitle',
            to: {
              name: 'randomdetect',
            }
          },
          {
            title: 'cos.cosIntfRandomDetectTitle',
            to: {
              name: 'randomdetectinterfaces'
            }
          }
        ]
      },
    ],
  },
  {
    title: 'acl.aclTitle',
    children:[
      {
        title: 'acl.intfTitle',
        to: {
          name: 'acls',
        }
      },
      {
        title: 'acl.macTitle',
        to: {
          name: 'macacls',
        }
      },
      {
        title: 'acl.ipAclTitle',
        to: {
          name: 'ipacls',
        }
      },
      {
        title: 'acl.ipv6AclTitle',
        to: {
          name: 'ipv6acls',
        }
      },
    ]
  },
  {
    title: 'diffServ.title',
    children: [
      {
        title: 'diffServ.title',
        to: {
          name: 'diffserv'
        }
      },
      {
        title: 'classMap.classMapTitle',
        to: {
          name: 'classmap'
        }
      },
      {
        title: 'policyMapConfig.title',
        to: {
          name: 'policymapconfig'
        }
      },
      {
        title: 'policyMapStats.title',
        to: {
          name: 'policymapstats'
        }
      },
      {
        title: 'servicePolicy.title',
        to: {
          name: 'servicepolicy'
        }
      },
    ]
  },
]

let datacenter = [
  {
    title: 'ets.mainTitle',
    children: [
      {
        title: 'ets.title',
        to: {
          name: 'ets',
        }
      },
      {
        title: 'ets.interfacesTitle',
        to: {
          name: 'etsinterfaces',
        }
      },
    ]
  },
  {
    title: 'dcbx.dcbx',
    children: [
      {
        title: 'dcbx.interface',
        to: {
          name: 'dcbx',
        }
      },
      {
        title: 'dcbxTlv.title',
        to: {
          name: 'dcbxtlvs',
        }
      }
    ]
  },
  {
    title: 'pfc.title',
    to: {
      name: 'pfc',
    },
  },
  {
    title: 'fipSnooping.title',
    children: [
      {
        title: 'fipSnooping.title',
        to: {
          name: 'fipsnoop',
        }
      },
      {
        title: 'fipsnoopingvlans.title',
        to: {
          name: 'fipsnoopingvlans',
        }
      },
      {
        title: 'fipSessions.title',
        to: {
          name: 'fipsessions'
        }
      },
      {
        title: 'fipSnoopingInterfaces.title',
        to: {
          name: 'fipsnoopinginterfaces',
        }
      },
      {
        title: 'fipsnoopingfcfs.title',
        to: {
          name: 'fipsnoopingfcfs',
        }
      },
      {
        title: 'fipsnoopingstats.title',
        to: {
          name: 'fipsnoopingstats',
          params: { mode: 'vlan' }
        }
      },
      {
        title: 'fipSnoopingENodes.title',
        to: {
          name: 'fipsnoopingenodes',
          params: { 
            pageNum: 1
          }
        }
      }
    ]
  },
  {
    title: 'qcn.treeTitle',
    children: [
    {
      title: 'qcn.title',
      to: {
        name: 'qcn',
      }
    },
    {
      title: 'qcnpriority.title',
      to: {
        name: 'qcnpriority',
      }
    },
    {
      title: 'qcnpriorityinterfaces.title',
      to: {
        name: 'qcnpriorityinterfaces',
      }
    },
    {
      title: 'qcnInterfaces.title',
      to: {
        name: 'qcninterfaces',
      }
    },
    {
      title: 'qcnLldpInterfaces.title',
      to: {
        name: 'qcnlldpinterfaces',
      }
    },
    {
      title: 'qcnstats.title',
      to: {
        name: 'qcnstats',
      }
    }]
  },
  {
    title: 'evb.title',
    children: [
      {
        title: 'evb.interfaceTitle',
        to: {
          name: 'evb',
        },
      },
      {
        title: 'evb.schannelTitle',
        to: {
          name: 'evbschannel',
        },
      },
      {
        title: 'evb.vsiTitle',
        to: {
          name: 'evbvsi',
        },
      }
    ]
  },
  {
    title: 'DCVPN',
    children: [
      {
        title: 'l2ol3Basic.title',
        to: {
          name: 'l2ol3basic',
          params: { type: 'nvgre'}
        },
      },
      {
        title: 'l2ol3Tunnels.title',
        to: {
          name: 'l2ol3tunnels',
          params: { type: 'nvgre' }
        },
      },
      {
        title: 'l2ol3Tenants.title',
        to: {
          name: 'l2ol3tenantsystem',
          params: { type: 'nvgre' }
        }
      }
    ]
  },
  {
    title: 'openflow.title',
    children: [
      {
        title: 'openflow.openflowCfgTitle',
        to: {
          name: 'openflowconfig',
        },
      },
      {
        title: 'openflow.openflowControlTitle',
        to: {
          name: 'openflowcontrollers',
          params: { pageNum: 1 }
        },
      },
      {
        title: 'openflow.openflowFlowTabTitle',
        to: {
          name: 'openflowflows',
          params: { pageNum: 1 }
        },
      },
      {
        title: 'openflow.openflowGroupTabTitle',
        to: {
          name: 'openflowgroups',
          params: { pageNum: 1 }
        },
      },
      {
        title: 'openflow.openflowTabTitle',
        to: {
          name: 'openflowtable',
        },
      }
    ]
  },
]

export var menuItems = [
  {
    title: 'general.homePage',
    to: {
      name: 'home',
    },
  },
  {
    title: 'navBar.management',
    children: management,
  },
  {
    title: 'navBar.l2_switching',
    children: l2Switch,
  },
  {
    title: 'navBar.dhcp',
    children: dhcp,
  },
  {
    title: 'navBar.security',
    children: security,
  },
  {
    title: 'navBar.sys_util',
    children: system,
  },
  {
    title: 'navBar.l3',
    children: l3,
  },
  {
    title: 'navBar.multicast',
    children: multicast,
  },
  {
    title: 'navBar.qos',
    children: qos,
  },
  {
    title: 'navBar.data_center',
    children: datacenter,
  },
]
