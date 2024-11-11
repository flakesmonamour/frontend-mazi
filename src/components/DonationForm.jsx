import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

function DonationForm({ amount, frequency }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      phoneNumber: '',
      mpesaPin: '',
      bankAccount: '',
      bankRouting: '',
      paypalEmail: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phoneNumber: Yup.string().when('paymentMethod', {
        is: 'mpesa',
        then: Yup.string()
          .matches(/^\+?\d{10,12}$/, 'Invalid phone number')
          .required('Required'),
      }),
      mpesaPin: Yup.string().when('paymentMethod', {
        is: 'mpesa',
        then: Yup.string()
          .matches(/^\d{4}$/, 'MPESA PIN must be 4 digits')
          .required('Required'),
      }),
      bankAccount: Yup.string().when('paymentMethod', {
        is: 'bank',
        then: Yup.string().required('Required'),
      }),
      bankRouting: Yup.string().when('paymentMethod', {
        is: 'bank',
        then: Yup.string().required('Required'),
      }),
      paypalEmail: Yup.string().when('paymentMethod', {
        is: 'paypal',
        then: Yup.string().email('Invalid email').required('Required'),
      }),
      // Additional validation for credit card, Stripe, etc.
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Handle form submission by sending data to the backend
    },
  });

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    formik.setFieldValue('paymentMethod', e.target.value);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Complete Your Donation</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...formik.getFieldProps('fullName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-600 text-sm">{formik.errors.fullName}</div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="mpesa">MPESA</option>
            <option value="paypal">PayPal</option>

          </select>
        </div>

        {paymentMethod === 'creditCard' || paymentMethod === 'debitCard' ? (
          <>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                {...formik.getFieldProps('cardNumber')}
                placeholder="1234 5678 9876 5432"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {formik.touched.cardNumber && formik.errors.cardNumber && (
                <div className="text-red-600 text-sm">{formik.errors.cardNumber}</div>
              )}
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date (MM/YY)
              </label>
              <input
                id="expiryDate"
                type="text"
                {...formik.getFieldProps('expiryDate')}
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {formik.touched.expiryDate && formik.errors.expiryDate && (
                <div className="text-red-600 text-sm">{formik.errors.expiryDate}</div>
              )}
            </div>

            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <input
                id="cvc"
                type="text"
                {...formik.getFieldProps('cvc')}
                placeholder="123"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {formik.touched.cvc && formik.errors.cvc && (
                <div className="text-red-600 text-sm">{formik.errors.cvc}</div>
              )}
            </div>
          </>
        ) : null}


        {/* Conditional Inputs for Each Payment Method */}
        {paymentMethod === 'mpesa' && (
          <>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                MPESA Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                {...formik.getFieldProps('phoneNumber')}
                placeholder="e.g., +254700000000"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-red-600 text-sm">{formik.errors.phoneNumber}</div>
              )}
            </div>

            <div>
              <label htmlFor="mpesaPin" className="block text-sm font-medium text-gray-700">
                MPESA PIN
              </label>
              <input
                id="mpesaPin"
                type="password"
                {...formik.getFieldProps('mpesaPin')}
                placeholder="Enter MPESA PIN"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {formik.touched.mpesaPin && formik.errors.mpesaPin && (
                <div className="text-red-600 text-sm">{formik.errors.mpesaPin}</div>
              )}
            </div>
          </>
        )}
        {paymentMethod === 'paypal' && (
          <div>
            <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700">
              PayPal Email
            </label>
            <input
              id="paypalEmail"
              type="email"
              {...formik.getFieldProps('paypalEmail')}
              placeholder="example@domain.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {formik.touched.paypalEmail && formik.errors.paypalEmail && (
              <div className="text-red-600 text-sm">{formik.errors.paypalEmail}</div>
            )}
          </div>
        )}

        {/* Additional fields for Stripe or other payment methods */}

        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span>Amount</span>
            <span>ksh{amount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Frequency</span>
            <span className="capitalize">{frequency}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>ksh{amount}/{frequency === 'monthly' ? 'mo' : frequency === 'quarterly' ? 'quarter' : 'year'}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Complete Donation
        </button>
      </div>
    </form>
  );
}

export default DonationForm;
