import Record from './Record';
import * as util from '@/util';

export default function  parseRecords(lines: string[]) {
    const result = lines.reduce((result: any, line: string) => {
       if(!result.record && line){
            result.record = new Record();
            result.records.push(result.record);
        }
        if(result.record) {
            result.record.lines.push(line);
        }
        if(line.startsWith('(`')) {
            result.isReadingData = true;
            return result;
        }
        if(line.startsWith(')')) {
            result.isReadingData = false;
            return result;
        }
        if(result.isReadingData) {
            if(line.includes('img = ')) {
                const uris = util.matchUris(line);
                if(uris.length > 0) {
                    // NOTE: only supports one image uri currently
                    // per key-value
                    result.record.annotations.push({
                        value: uris[0],
                        key: 'img',
                    });
                }
            }
        }
        if(!line && !result.isReadingData) {
            result.record = undefined;
            result.isReadingDate = false;
        }
        return result;
    }, {
        records: [],
        record: undefined,
        isReadingData: false,
    });
    return result.records.reverse();
}

