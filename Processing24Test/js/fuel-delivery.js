
export function fuelDelivery() {
    const validation = new JustValidate('#fuel-delivery-form', {
        errorFieldCssClass: 'is-invalid',
    });
    validation
        .addField('#form-delivery-username', [{
                                    rule: 'required',
                                    errorMessage: 'Поле обязательно для заполнения',
                                }, {                             
                                    rule: 'minLength',
                                    value: 3,
                                    errorMessage: 'Поле должно быть длиной не меньше 3-х символов',
                                }, {
                                    rule: 'maxLength',
                                    value: 20,
                                    errorMessage: 'Поле должно быть длиной не больше 20-ти символов'
                                },
                            ])
        .addField('#form-delivery-phone', [{
                                rule: 'required',
                                errorMessage: 'Поле обязательно для заполнения',
                            }, {
                                validator: (value) => {
                                    return !value.includes("_");
                                },
                                errorMessage: 'Поле заполнено не полностью',
                            }
                        ])
        .addField('#form-delivery-conditions', [{
                                            rule: 'required',
                                            errorMessage: 'Поле обязательно для заполнения'
                                        },
                                    ])
    .onSuccess((event) => {
        console.log('Validation passes and form submitted', event);
    });

}