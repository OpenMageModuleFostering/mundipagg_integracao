<?php

class Uecommerce_Mundipagg_TestController extends Uecommerce_Mundipagg_Controller_Abstract {

	public function indexAction() {
		$model = Mage::getModel('customer/customer');

		foreach ($model->getCollection() as $i) {
			$customer = $model->load($i->getId());

			var_dump($customer->getData());
		}
	}

	public function createCustomerAction() {
		$customer = Mage::getModel('customer/customer');

		$customer->setWebsiteId(1)
			->setGroupId(1)
			->setEmail('teste@teste.com')
			->setGender(1)
			->setFirstname('Teste')
			->setLastname('Testelastname')
			->setTaxvat('74769331258')
			->setPassword('Teste@123');

		try {
			$customer->save();

			echo '<p>customer created</p>';

		} catch (Exception $e) {
			echo $e->getTraceAsString();
		}

		$address = Mage::getModel('customer/address');

		$address->setCustomerId($customer->getId())
			->setFirstname($customer->getFirstname())
			->setLastnmae($customer->getLastname())
			->setCountryId('BR')
			->setPostcode('20021130')
			->setCity('Rio de Janeiro')
			->setTelephone('21988880000')
			->setStreet('Av General Justo 375')
			->setRegionId('RJ')
			->setVatId($customer->getTaxvat())
			->setIsDefaultBilling(1)
			->setIsDefaultShipping(1)
			->setSaveInAddressBook(1);

		try {
			$address->save();
			echo '<p>address created</p>';

		} catch (Exception $e) {
			echo $e->getTraceAsString();
		}

	}

	public function createProductAction() {
		Mage::app()->setCurrentStore(Mage_Core_Model_App::ADMIN_STORE_ID);

		$product = Mage::getModel('catalog/product');

		$product->setAttributeSetId(4)
			->setTypeId('simple')
			->setSku('000005')
			->setName('Produto de teste do script')
			->setWeight(10)
			->setStatus(1)
			->setTaxClassId(0)//tax class (0 - none, 1 - default, 2 - taxable, 4 - shipping)
			->setVisibility(Mage_Catalog_Model_Product_Visibility::VISIBILITY_BOTH)
			->setPrice(10.00)
			->setDescription('Produto de teste')
			->setShortDescription('Produto de teste');

//			->setStockData(array(
//				'manage_stock' => 0,
//				'use_config_manage_stock' => 0,
//				'use_config_min_sale_qty' => 1,
//				'use_config_max_sale_qty' => 1,
//				'use_config_enable_qty_increments' => 1,
////				'low_stock_date' => strtotime('now')
//				'low_stock_date' => '2016-08-11 21:11:38'
//			));

//		$stock->setLowStockDate(now())
//			->setManageStock(0)
//			->setUseConfigManageStock(0)
//			->setUseConfigMinSaleQty(1)
//			->setUseConfigMaxSaleQty(1)
//			->setUseConfigEnableQtyIncrements(1);
//
//		$product->setStockData($stock);

		try {
			$product->save();
			echo '<p>Produto criado</p>';

		} catch (Exception $e) {
			echo "<p>{$e->getMessage()}</p>";
			echo "<p>{$e->getTraceAsString()}</p>";
		}
	}

	public function testeProductAction() {
		$id = Mage::getModel('catalog/product')->getCollection()->getLastItem()->getId();
		$product = Mage::getModel('catalog/product')->load($id);
		$stock = $product->getStockItem();

		var_dump(get_class($stock));


//		var_dump($product->getData());
//		var_dump(get_class($stock));
		var_dump($stock->getData());
	}

	public function authorizeAmountAction() {
		$amount = 1;
		$orderId = 100000068;

		$order = Mage::getModel('sales/order')->loadByIncrementId($orderId);

		try{
			$order->setPaymentAuthorizationAmount($amount);
			$order->save();

			echo 'success';

		} catch (Exception $e){
			echo "Error {$e->getMessage()}";
		}

	}

}