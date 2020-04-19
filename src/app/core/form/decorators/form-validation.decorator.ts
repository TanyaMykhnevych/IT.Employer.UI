import { FormGroup } from '@angular/forms';

export function Validate(): MethodDecorator {
    return (target: Function, propertyKey: string, descriptor: PropertyDescriptor) => {

        const originalMethod = descriptor.value;

        descriptor.value = function (): PropertyDescriptor {
            // tslint:disable-next-line:no-invalid-this
            const context = this;

            if (!(context as { form: FormGroup }).form.valid) {
                return;
            }

            return originalMethod.apply(context, arguments);
        };
    };
}
