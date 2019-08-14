<?php
/**
 * Uecommerce
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Uecommerce EULA.
 * It is also available through the world-wide-web at this URL:
 * http://www.uecommerce.com.br/
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade the extension
 * to newer versions in the future. If you wish to customize the extension
 * for your needs please refer to http://www.uecommerce.com.br/ for more information
 *
 * @category   Uecommerce
 * @package    Uecommerce_Mundipagg
 * @copyright  Copyright (c) 2012 Uecommerce (http://www.uecommerce.com.br/)
 * @license    http://www.uecommerce.com.br/
 */

/**
 * Mundipagg Payment module
 *
 * @category   Uecommerce
 * @package    Uecommerce_Mundipagg
 * @author     Uecommerce Dev Team
 */

class Uecommerce_Mundipagg_Model_Boleto extends Uecommerce_Mundipagg_Model_Standard
{
    /**
     * Availability options
     */
    protected $_code = 'mundipagg_boleto';
    protected $_formBlockType = 'mundipagg/standard_boleto';
    protected $_infoBlockType = 'mundipagg/info';
    protected $_isGateway = true;
    protected $_canOrder  = true;
    protected $_canAuthorize = true;
    protected $_canCapture = true;
    protected $_canCapturePartial = false;
    protected $_canRefund = true;
    protected $_canVoid = true;
    protected $_canUseInternal = true;
    protected $_canUseCheckout = true;
    protected $_canUseForMultishipping = true;
    protected $_canSaveCc = false;
    protected $_canFetchTransactionInfo = false;
    protected $_canManageRecurringProfiles = false;
    protected $_allowCurrencyCode = array('BRL', 'USD', 'EUR');
    protected $_isInitializeNeeded = true;

    public function __construct($Store = null)
    {
        if (!($Store instanceof Mage_Core_Model_Store)) {
            $Store = null;
        }
        parent::__construct($Store);
        
        $validadeBoleto = $this->getConfigData('dias_validade_boleto', $Store);
        
        if(empty($validadeBoleto) || $validadeBoleto == ' ' || is_null($validadeBoleto) || $validadeBoleto == ''){
            $validadeBoleto = '3';
        }
        $this->setDiasValidadeBoleto(trim($validadeBoleto));
        $this->setInstrucoesCaixa(trim($this->getConfigData('instrucoes_caixa', $Store)));
    }

    /**
     * Armazena as informações passadas via formulário no frontend
     * @access public
     * @param array $data
     * @return Uecommerce_Mundipagg_Model_Standard
     */
    public function assignData($data) 
    {
        parent::assignData($data);

        return $this;
    }

    /**
     * Prepare info instance for save
     *
     * @return Mage_Payment_Model_Abstract
     */
    public function prepareSave()
    {
        parent::prepareSave();
    }

    /**
     * Instantiate state and set it to state object
     *
     * @param string $paymentAction
     * @param Varien_Object
     */
    public function initialize($paymentAction, $stateObject)
    {
        $mageVersion = Mage::helper('mundipagg/version')->convertVersionToCommunityVersion(Mage::getVersion());

        if (version_compare($mageVersion, '1.5.0', '<')) { 
            $orderAction = 'order';
        } else {
            $orderAction = Mage_Payment_Model_Method_Abstract::ACTION_ORDER;
        }

        $payment = $this->getInfoInstance();
        $order = $payment->getOrder();

        parent::order($payment, $order->getBaseTotalDue());
    }
}