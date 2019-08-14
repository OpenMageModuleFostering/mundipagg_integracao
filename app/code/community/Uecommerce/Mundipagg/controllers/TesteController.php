<?php

class Uecommerce_Mundipagg_TesteController extends Uecommerce_Mundipagg_Controller_Abstract {

	public function indexAction() {
		$order = Mage::getModel('sales/order')->loadByIncrementId('100000012');
		$payment = $order->getPayment();

		var_dump(get_class($payment));
		var_dump($payment->getAdditionalInformation());
	}

	public function processOrderAction() {
		$api = new Uecommerce_Mundipagg_Model_Api();
		$xml = file_get_contents('/var/www/magento19/teste.xml');
		$postData = array(
			'xmlStatusNotification' => $xml
		);

		$response = $api->processOrder($postData);

		echo $response;
	}

	public function transactionsAction() {
		$transactions = Mage::getModel('sales/order_payment_transaction')
			->getCollection()
			->addAttributeToFilter('order_id', '1');

		foreach ($transactions as $transaction) {
			var_dump($transaction->getData());
		}
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

	public function checkoutAction() {

	}

}