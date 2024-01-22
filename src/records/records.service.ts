import { Injectable } from '@nestjs/common';

@Injectable()
export class RecordsService {
  
  find(id: string): string {
		return `find a record ${id}`; 
	}
}
