import { IDbEntry } from './IDbEntry';
import { IDatabaseData } from './IDatabaseData';


export function getDatabaseData(
    items: IDbEntry[],
)
    : IDatabaseData
{
    const data: IDatabaseData
        = {
            columnValues: {},
            moleculeIds: {},
            moleculeKeyNames: new Set(),
            molecules: [],
        };

    for (let moleculeId = 0; moleculeId < items.length; ++moleculeId)
    {
        addMoleculeData(data, moleculeId, items[moleculeId]);
    }
    return data;
}


function addMoleculeData(
    data: IDatabaseData,
    moleculeId: number,
    dbEntry: IDbEntry,
)
    : void
{
    const notKeyNames: Set<string>
        = new Set(['a', 'b', '_id']);

    const propNameMap: any
        = {
            a: 'atoms',
            b: 'bonds',
        };

    const molecule: any
        = {};

    for (const [propName, propValue] of Object.entries(dbEntry))
    {
        if (notKeyNames.has(propName))
        {
            if (propName === '_id')
            {
                continue;
            }
            const newPropName: string
                = propNameMap[propName];
            molecule[newPropName] = dbEntry[propName];
        }
        else
        {
            if (data.columnValues[propName] === undefined)
            {
                data.columnValues[propName] = {};
                data.moleculeIds[propName] = {};
            }
            molecule[propName] = dbEntry[propName];
            data.moleculeKeyNames.add(propName);
            data.columnValues[propName as string][moleculeId]
                = propValue as string;
            data.moleculeIds[propName][propValue as string]
                = moleculeId;
        }
    }
    data.molecules.push(molecule);
}