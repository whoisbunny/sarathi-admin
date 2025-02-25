import React from "react";
import Card from "@/components/ui/Card";
import { useDispatch } from "react-redux";
import { toggleEditModal, updateCoupon } from "@/store/coupon/coupon.reducer";

const CouponGrid = ({ coupon }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(updateCoupon(coupon));
    dispatch(toggleEditModal(true));
  };

  return (
    <Card>
      <header className="flex justify-between items-end mb-3">
        <div className="flex space-x-4 items-center rtl:space-x-reverse">
          <h4 className="font-medium text-lg">{coupon.code}</h4>
        </div>
        <button onClick={handleEdit} className="btn btn-outline-dark">
          Edit
        </button>
      </header>
      <p>{coupon.description}</p>
      <p>Discount: {coupon.discountValue}</p>
      <p>Type: {coupon.discountType}</p>
      <p>Start Date: {new Date(coupon.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(coupon.endDate).toLocaleDateString()}</p>
    </Card>
  );
};

export default CouponGrid;
