const jwt = require('jsonwebtoken');

const readWrite = require('./readWrite');
const dataPath = './backend/db/provider.json';
const trafficPath = './backend/db/traffic.json';

exports.createSecret = (req, res, next) => {
    console.log('hii in secret');
    readWrite.readFile(dataPath, true, data => {
        
        let fetchedProvider = data[req.params.id];

        const token = jwt.sign(
            {name: fetchedProvider.name, providerId: fetchedProvider.id},
            process.env.JWT_KEY,
            { expiresIn: '30 days'}
        );
      
        return res.status(200).json({
            token: token,
            expiresIn: 3600,
            providerId: fetchedProvider.id
        });
    });
}

exports.getDetails = (req, res, next) => {
    try {
        readWrite.readFile(dataPath, true, data => {
            console.log(req.providerData);
            let provider = data[req.providerData.providerId]
            if (provider) {

                readWrite.readFile(dataPath, true, data => {
                    let fetchedProvider = data[req.providerData.providerId];

                    readWrite.readFile(trafficPath, true, data => {
                        const trafficId = Date.now().toString();
                        data[trafficId] = {};
                        data[trafficId]['api_call'] = 'getDetails';
                        data[trafficId]['provider_name'] = fetchedProvider.name;
                        data[trafficId]['provider_id'] = req.providerData.providerId;
                        data[trafficId]['date'] = Date.now().toString();
                        console.log('data--->', data);

                        readWrite.writeFile(trafficPath, JSON.stringify(data, null, 2), () => {
                            return res.status(200).json(provider);
                        });
                    });
                });

                
            } else {
                res.status(404).json({message: 'Provider not found!'});
            }
        });
    } catch {
        res.status(500).json({message: 'Fetching provider failed!'})
    }
}


exports.getTrafficDetails = (req, res, next) => {
    const date = +req.query.date;
    let totalRequest = 0;

    try {
        readWrite.readFile(trafficPath, true, data => {
            let filterData;

            if (date != '') {
                filterData = Object.values(data).filter((product) => {
                    return new Date(parseInt(date)).setHours(0,0,0,0) === new Date(parseInt(product.date)).setHours(0,0,0,0);
                });
            } else {
                filterData = data;
            }
            
            
            const updateData = Object.values(filterData).reduce((acc, curr) => {
                let count = 1;
                totalRequest++;
                if (acc.hasOwnProperty(curr.provider_id) && acc[curr.provider_id].hasOwnProperty("count")) {
                    count = acc[curr.provider_id]['count'] + 1;
                }
                 acc[curr.provider_id] = {
                    provider_name: curr.provider_name, 
                    count: count
                } 
                return acc;
            }, [])

            return res.status(200)
            .json({message : 'Posts fechted successfully.', totalRequest: totalRequest, provider: updateData});

        });
    } catch {
        return res.status(500).json({message: 'Fetching traffic failed!'});
    }
}