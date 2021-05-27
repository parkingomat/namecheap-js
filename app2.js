//require("@rqt/namecheap")
//require("bosom")
import NameCheap from '@rqt/namecheap'
import bosom from 'bosom'
import each from 'gitpad-each'

(async () => {
    //import bosom from 'bosom'
    const {user, key, ip} = await bosom('.namecheap.json')
    console.log(user, key, ip);

    const namecheap = new NameCheap({
        user, key, sandbox: false, ip,
    })
    /*

        // 2. Get list of addresses on the account.
        const cc = await namecheap.address.getList()
        console.log('Addresses:', cc, '\n')

        const domain = "softreck.com"

        // 5. Retrieve info about domain.
        const info = await namecheap.domains.getInfo(domain)
        //console.log('Info:', info, '\n')
        console.log('Nameserver:', info.DnsDetails.Nameserver, '\n')
    */

    // 6. Get a list of domains (with filter).
    //const list = await namecheap.domains.getList({
    //  filter: domain,
    // })
    const list = await namecheap.domains.getList({
        pageSize: 200
    })
    //console.log('List:', list.domains, '\n')
    //console.log( list.domains, '\n')

    let obj = {}
    // list.domains.forEach(function (item) {
    //    domainList(namecheap, item, obj);
    // });
    const forLoop = async _ => {
        console.log('Start')

        for (let index = 0; index < list.domains.length; index++) {
            // Get num of each fruit
            const item = list.domains[index];
            const domain = item.Name;
            //console.log('domain:', domain);
            obj[domain] = {};

            // 5. Retrieve info about domain.
            const info = await namecheap.domains.getInfo(domain)
            obj[domain] = info.DnsDetails.Nameserver;

            // USER ADDRESS
            // const info2 = await namecheap.address.getInfo(info.ID)

            // const info2 = await namecheap.dns.getHosts("cpaas.info")
            // console.log('Info:', info2, '\n')
            // console.log('Info:', info, '\n')
        }

        console.log('End')
    }
    await forLoop();
    console.log(obj);

    // each(list.domains, function (item){
    //     console.log('element:', item.Name, '\n')
    // });

    /*
    // 1. Check a domain.
    const c = await namecheap.domains.check('test.co')
    console.log('Check:', c, '\n')

/*
    // 2. Get list of addresses on the account.
    const cc = await namecheap.address.getList()
    console.log('Addresses:', cc, '\n')

    // 3. Find the default address and get its info.
    const { AddressId } = cc.find(({ IsDefault }) => IsDefault)
    const address = await namecheap.address.getInfo(AddressId)

    // 4. Register the domain using the address.
    const d = new Date().toLocaleString().replace(/[ :]/g, '-')
    const domain = `rqt-example-${d}.com`
    const r = await namecheap.domains.create({
        domain,
        address,
    })
    console.log('Registered:', r, '\n')

    // 5. Retrieve info about domain.
    const info = await namecheap.domains.getInfo(domain)
    console.log('Info:', info, '\n')

    // 6. Get a list of domains (with filter).
    const list = await namecheap.domains.getList({
        filter: domain,
    })
    console.log('List:', list, '\n')
*/

})()

async function domainList(namecheap, item, obj) {
    // array.push({item.ID);
    // array.push(item.Name);

    var domain = item.Name;
    //console.log('domain:', domain);
    obj[domain] = {};
    // 5. Retrieve info about domain.
    const info = await namecheap.domains.getInfo(domain)
    //console.log('Info:', info, '\n')
    obj[domain] = info.DnsDetails.Nameserver;
    //console.log('Nameserver:', info.DnsDetails.Nameserver, '\n')
    // array.push(item.Created);
    // array.push(item.Expires);
    //console.log('obj:', obj);

    return obj;
}

function listit(list) {

    list.forEach(element => {
        console.log(element);
    });
    /*
    list.forEach(function(element, index){
        console.log('element:', element,index, '\n')

    })

     */
}

/*
(async () => {
    try {
        // 0. Create a client.
        const { user, key, ip } = await bosom('.namecheap.json')
        //const user = 1
        //const key = 2
        //const ip = 3
        const namecheap = new NameCheap({
            user, key, sandbox: true, ip,
        })

        // 1. Check a domain.
        const c = await namecheap.domains.check('test.co')
        console.log('Check:', c, '\n')

        // 2. Get list of addresses on the account.
        const cc = await namecheap.address.getList()
        console.log('Addresses:', cc, '\n')

        // 3. Find the default address and get its info.
        const { AddressId } = cc.find(({ IsDefault }) => IsDefault)
        const address = await namecheap.address.getInfo(AddressId)

        // 4. Register the domain using the address.
        const d = new Date().toLocaleString().replace(/[ :]/g, '-')
        const domain = `rqt-example-${d}.com`
        const r = await namecheap.domains.create({
            domain,
            address,
        })
        console.log('Registered:', r, '\n')

        // 5. Retrieve info about domain.
        const info = await namecheap.domains.getInfo(domain)
        console.log('Info:', info, '\n')

        // 6. Get a list of domains (with filter).
        const list = await namecheap.domains.getList({
            filter: domain,
        })
        console.log('List:', list, '\n')
    } catch (err) {
        console.log(err)
    }
})()
*/
