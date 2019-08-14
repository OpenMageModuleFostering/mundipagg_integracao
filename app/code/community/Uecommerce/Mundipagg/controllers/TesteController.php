<?php

class Uecommerce_Mundipagg_TesteController extends Uecommerce_Mundipagg_Controller_Abstract {

	public function indexAction() {
		$order = Mage::getModel('sales/order')->loadByIncrementId('100000012');
		$payment = $order->getPayment();
		$paymentMethod = $payment->getMethodInstance()->getCode();

		var_dump($paymentMethod);
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
		$resource = Mage::getSingleton('core/resource');
		$conn = $resource->getConnection('core_write');
		$query = '
		UPDATE sales_payment_transaction
		SET is_closed = 0
		WHERE transaction_id = 75
		';

		try {
			$conn->query($query);
			echo 'success';

		} catch (Exception $e) {
			echo "Error: " . $e->getMessage();
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

	public function notificationsAction() {
		$model = Mage::getModel('adminnotification/inbox')
			->getCollection()
			->addFilter('url', 'https://www.magentocommerce.com/magento-connect/mundipagg-payment-gateway.html')
			->setOrder('date_added', 'desc')
			->getLastItem();

		var_dump($model->getData());

//		foreach ($model->getCollection() as $item) {
//			var_dump($item->getData());
//		}

	}

	public function lastNotifAction() {
		$model = new Uecommerce_Mundipagg_Model_Admin_Notification();
		$data = $model->getLastSavedNotification();

		var_dump($data->getData());

	}

	public function testeRedirectAction() {
		$this->_redirect('mundipagg/standard/cancel');
	}

	public function attributeAction() {
		$attributeCodes = array('mundipagg_frequency_enum', 'mundipagg_recurrences');

		foreach ($attributeCodes as $attributeCode) {
			try {
				$attribute = new Mage_Eav_Model_Entity_Attribute();
				$attribute->loadByCode(Mage_Catalog_Model_Product::ENTITY, $attributeCode);

				$attribute->setIsRequired(false);
				$attribute->save();

				var_dump($attribute->getData());

			} catch (Exception $e) {
				echo $e->getMessage();

				return;
			}
		}
	}

	public function invoiceAction() {
		$invoice = Mage::getModel('sales/order_invoice')->loadByIncrementId(100000003);

		var_dump($invoice->getData());

	}

}