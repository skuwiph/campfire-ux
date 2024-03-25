import { Pipe, PipeTransform } from '@angular/core'
//import { environment } from '@environments/environment'

@Pipe({
    name: 'cloudimage'
})
export class CloudimagePipe implements PipeTransform {
    transform(value: string): string {
        return `https://exfolse.cloudimg.io/s/cdn/x/${value}`
    }
}

@Pipe({
    name: 'cloudimageWidth'
})
export class CloudimageWidthPipe implements PipeTransform {
    transform(value: string, width: number): string {
        return `https://exfolse.cloudimg.io/s/width/${width}/${value}`
    }
}

@Pipe({
    name: 'cloudimageHeight'
})
export class CloudimageHeightPipe implements PipeTransform {
    transform(value: string, height: number): string {
        return `https://exfolse.cloudimg.io/s/height/${height}/${value}`
    }
}

@Pipe({
    name: 'cloudimageCrop'
})
export class CloudimageCropPipe implements PipeTransform {
    transform(value: string, width: number, height: number): string {
        return `https://exfolse.cloudimg.io/s/crop/${width}x${height}/${value}`
    }
}


