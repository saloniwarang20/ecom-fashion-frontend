import paymentImages from "../../assets/payment/paymentImage";

const paymentOptions = [
  {
    id: "CARD",
    title: "Credit / Debit Card",
    subtitle: "Visa, Mastercard, RuPay",
    images: [
      paymentImages.visa,
      paymentImages.mastercard,
      paymentImages.rupay
    ]
  },
  {
    id: "UPI",
    title: "UPI",
    subtitle: "Google Pay, PhonePe, Paytm",
    images: [
      paymentImages.gpay,
      paymentImages.phonepe,
      paymentImages.paytm
    ]
  },
  {
    id: "NET_BANKING",
    title: "Net Banking",
    subtitle: "All major Indian banks",
    images: [
      paymentImages.sbi,
      paymentImages.icici
    ]
  },
  {
    id: "COD",
    title: "Cash on Delivery",
    subtitle: "Pay when your order arrives",
    images: [
      paymentImages.cod
    ]
  }
];

const PaymentSection = ({
  paymentMethod,
  setPaymentMethod
}) => {

  return (
    <div className="py-5 sm:py-6 px-4 sm:px-6 lg:px-8
    ">

      <h2 className="text-base sm:text-md font-extrabold mb-3">
        Payment
      </h2>


      <div className="space-y-3 sm:space-y-4">

        {paymentOptions.map((option) => (

          <label
            key={option.id}
            className={`flex items-start gap-3 border rounded-xl p-3 sm:p-4 cursor-pointer transition
              ${
                paymentMethod === option.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }
            `}
          >

            {/* Radio */}
            <input
              type="radio"
              checked={paymentMethod === option.id}
              onChange={() => setPaymentMethod(option.id)}
              className="accent-zinc-900 mt-1 shrink-0"
            />


            {/* Content */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full min-w-0">

              {/* Text */}
              <div className="min-w-0">

                <h3 className="font-semibold text-sm sm:text-base">
                  {option.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 mt-1 wrap-break-word">
                  {option.subtitle}
                </p>

              </div>


              {/* Payment Logos */}
              <div className=" flex items-center gap-2 shrink-0">

                {option.images.map((image, index) => (

                  <img
                    key={index}
                    src={image}
                    alt=""
                    className=" h-6 sm:h-7 max-w-12 sm:max-w-14 object-contain"
                  />

                ))}

              </div>

            </div>

          </label>

        ))}

      </div>

    </div>
  );
};

export default PaymentSection;