import { Maybe, Just, Nothing } from 'maybe';
import { IPartialMolecule } from './IPartialMolecule';
import { IAtom } from './IAtom';
import { IBond } from './IBond';

type IDbEntryPrimitive =
    | undefined
    | string
    | number
    | boolean;


interface IDbEntry
{
    [prop: string]:
        IDbEntryPrimitive
        | IDbEntryPrimitive[]
        | IDbEntry
        | IDbEntry[];
}

type IDbEntryValue =
    | IDbEntryPrimitive | IDbEntryPrimitive[] | IDbEntry | IDbEntry[];


export function fromAny(
    moleculeKey: string
)
    : (arg: IDbEntry) => Maybe<IPartialMolecule>
{
    return (arg: IDbEntry) => {

        const key: IDbEntryValue
            = arg[moleculeKey];

        if (typeof key !== 'string')
        {
            return new Nothing();
        }

        const keys: Map<string, string>
            = getMoleculeKeys(arg);

        const atoms: IAtom[] | undefined
            = getAtoms(arg);

        if (atoms === undefined)
        {
            return new Nothing();
        }

        const bonds: IBond[] | undefined
            = getBonds(atoms, arg);

        if (bonds === undefined)
        {
            return new Nothing()
        }

        return new Just({
            key,
            keys,
            propertyValues: new Map(),
            atoms,
            bonds,
        });
    };
}


function getMoleculeKeys(
    entry: IDbEntry,
)
    : Map<string, string>
{
    const keys: Map<string, string>
        = new Map();

    for (const [key, value] of Object.entries(entry))
    {
        if (
            key !== 'a'
            &&
            key !== 'b'
            &&
            key !== '_id'
            &&
            typeof value === 'string'
        ){
            keys.set(key, value);
        }
    }

    return keys;
}


function getAtoms(
    entry: IDbEntry,
)
    : IAtom[] | undefined
{
    const atomEntries: IDbEntryValue
        = entry['a'];

    if (!Array.isArray(atomEntries))
    {
        return;
    }

    const atoms: IAtom[]
        = [];

    for (const atomEntry of atomEntries)
    {
        if (!Array.isArray(atomEntry))
        {
            return;
        }
        if (typeof atomEntry[0] !== 'number')
        {
            return;
        }
        atoms.push({ atomicNumber: atomEntry[0] });
    }

    return atoms;
}


function getBonds(
    atoms: IAtom[],
    entry: any,
)
    : IBond[] | undefined
{
    const bondEntries: IDbEntryValue
        = entry['b'];

    if (!Array.isArray(bondEntries))
    {
        return;
    }

    const bonds: IBond[]
        = [];

    for (const bondEntry of bondEntries)
    {
        if (!Array.isArray(bondEntry))
        {
            return;
        }

        if (
            typeof bondEntry[0] !== 'number'
            ||
            typeof bondEntry[1] !== 'number'
            ||
            typeof bondEntry[2] !== 'number'
        ) {
            return;
        }

        if (atoms[bondEntry[0]] === undefined)
        {
            return;
        }
        if (atoms[bondEntry[1]] === undefined)
        {
            return;
        }

        bonds.push({
            atom1Id: bondEntry[0],
            atom2Id: bondEntry[1],
            order: bondEntry[2],
        });
    }

    return bonds;
}
