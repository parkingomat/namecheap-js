import NameCheap from '@rqt/namecheap'
import bosom from 'bosom'

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
    //console.log( list.domains, '\n')

    let nameserver = {}
    let dns = {}

    const forLoop = async _ => {
        console.log('Start')

        for (let index = 0; index < list.domains.length; index++) {
            // Get num of each fruit
            const item = list.domains[index];
            const domain = item.Name;
            //console.log('domain:', domain);

            // 5. Retrieve info about domain.
            const info = await namecheap.domains.getInfo(domain)

            if( info.DnsDetails.Nameserver.includes('dns1.registrar-servers.com')){
                nameserver[domain] = {};
                nameserver[domain] = info.DnsDetails.Nameserver

                const dnss = await namecheap.dns.getHosts(domain)
                //console.log('dnss:', dnss, '\n')

                dns[domain] = [];
                dns[domain].push("https://" + domain);

                for (let ind = 0; ind < dnss.hosts.length; ind++) {
                    // const type = dnss.hosts[ind]["Type"];
                    const address = dnss.hosts[ind]["Address"];
                    dns[domain].push(address);
                }
            }

            // obj[domain] = !!info.DnsDetails.Nameserver.find(nameserver => {
            //     return nameserver.Nameserver === 'Marcus'
            // })

            // USER ADDRESS
            // const info2 = await namecheap.address.getInfo(info.ID)


            // console.log('Info:', info, '\n')
        }

        console.log('End')
    }
    await forLoop();
    console.log(nameserver);
    console.log(dns);

})()

