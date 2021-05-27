import NameCheap from '@rqt/namecheap'
import bosom from 'bosom'
import request from 'request'
import fs from 'fs'

//var msg = require('./status.js');
//console.log(msg);


(async () => {
    //import bosom from 'bosom'
    const {user, key, ip} = await bosom('.namecheap.json')
    console.log(user, key, ip);

    const namecheap = new NameCheap({
        user, key, sandbox: false, ip,
    })

    const list = await namecheap.domains.getList({
        pageSize: 100,
        page: 2,
        sort: 'name',
        desc: false,
    })
    // console.log(list.domains, '\n')

    // let nameserver = {}
    let dns = {}

    const forLoop = async _ => {
        console.log('Start')

        for (let index = 0; index < list.domains.length; index++) {
            // Get num of each fruit
            const item = list.domains[index];
            const domain = item.Name;
            console.log(domain);


            // 5. Retrieve info about domain.
            const info = await namecheap.domains.getInfo(domain)

            if (
                info.DnsDetails.Nameserver.includes('ns1.sedoparking.com') ||
                info.DnsDetails.Nameserver.includes('NS1.SEDOPARKING.COM')
            ) {
                dns[domain] = {};
                dns[domain] = info.DnsDetails.Nameserver

                let url = "http://" + domain
                dns[domain].push(url);

                const url1 = "https://" + domain
                dns[domain].push(url1);

                const url2 = "https://ap.www.namecheap.com/domains/marketplace/selldomain/" + domain
                dns[domain].push(url2);

                const url3 = "https://ap.www.namecheap.com/Domains/DomainControlPanel/"+ domain + "/domain"
                dns[domain].push(url3);

                request
                    .get(url)
                    .on('error', function (err) {
                        //console.error(err)
                        dns[domain].push(err.code);
                        dns[domain].push(err.address);
                    })

                let dnss = false;
                try {
                    dnss = await namecheap.dns.getHosts(domain)
                } catch (e) {
                    dnss = false;
                }
                console.log('dnss:', dnss, '\n')
                if(dnss){
                    for (let ind = 0; ind < dnss.hosts.length; ind++) {
                        // const type = dnss.hosts[ind]["Type"];
                        const address = dnss.hosts[ind]["Address"];
                        dns[domain].push(address);
                    }
                }
            }
        }

        console.log('End')
    }
    await forLoop();
    // console.log(nameserver);
    console.log(dns);

})()

