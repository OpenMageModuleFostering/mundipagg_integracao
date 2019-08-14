<?php

class Uecommerce_Mundipagg_TesteController extends Uecommerce_Mundipagg_Controller_Abstract {

	public function indexAction() {
		$order = Mage::getModel('sales/order')->loadByIncrementId('100000012');
		$payment = $order->getPayment();

		var_dump(get_class($payment));
		var_dump($payment->getAdditionalInformation());
	}

	public function customerAction() {
		$customerSesion = Mage::getSingleton('customer/session');
		$customer = Mage::getModel('customer/customer')->load($customerSesion->getId());

		$orders = Mage::getModel('sales/order')->getCollection()
			->addFieldToFilter('customer_id', $customer->getId())
			->addFieldToFilter('increment_id', '100000026');

		var_dump($orders);

//		echo "orders found: ".count($orders);
//
//		foreach ($orders as $order){
//			var_dump($order->getData());
//		}
	}

	public function checkoutAction(){

	}

}