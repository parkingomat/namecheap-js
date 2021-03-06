import NameCheap from '@rqt/namecheap'
import bosom from 'bosom'
import request from 'request'

(async () => {
    //import bosom from 'bosom'
    const {user, key, ip} = await bosom('.namecheap.json')
    console.log(user, key, ip);

    const namecheap = new NameCheap({
        user, key, sandbox: false, ip,
    })

    const list = await namecheap.domains.getList({
        pageSize: 100,
        page: 1,
        sort: 'name',
        desc: false,
    })
    // console.log(list.domains, '\n')

    let dns = {}

    const forLoop = async _ => {
        console.log('Start')

        for (let index = 0; index < list.domains.length; index++) {
            // Get num of each fruit
            const item = list.domains[index];
            const domain = item.Name;
            console.log(domain);

            // Retrieve info about domain.
            const info = await namecheap.domains.getInfo(domain)

            //console.log(info.DnsDetails.Nameserver.includes('dns1.registrar-servers.com'));
            if (
                info.DnsDetails.Nameserver.includes('dns1.registrar-servers.com') === false &&
                info.DnsDetails.Nameserver.includes('ns1.sedoparking.com') === false &&
                info.DnsDetails.Nameserver.includes('NS1.SEDOPARKING.COM') === false
            ) {
                // dns[domain] = {};
                dns[domain] = info.DnsDetails.Nameserver
                // console.log(info.DnsDetails.Nameserver);
                //const dnss = await namecheap.dns.getHosts(domain)

                let url = "http://" + domain
                dns[domain].push(url);

                const url1 = "https://" + domain
                dns[domain].push(url1);

                request
                    .get(url)
                    .on('error', function (err) {
                        //console.error(err)
                        dns[domain].push(err.code);
                        dns[domain].push(err.address);
                    })
            }
        }
        console.log('End')
    }
    await forLoop();
    console.log(dns);
})()

