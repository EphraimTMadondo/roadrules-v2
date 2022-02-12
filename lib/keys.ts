import { v4 as uuidv4 } from 'uuid';

export type K<DataType> = DataType & { key: string };

export function addKeys<DataType> ( objects: DataType[] ): K<DataType>[] {

  return objects
    .map( object => addKey( object ) );

}

export function addKey<DataType> ( object: DataType ): K<DataType> {

  return {
    ...object,
    key: createKey()
  }

}

export function createKey () {
  return uuidv4();
}