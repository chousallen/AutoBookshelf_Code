/*
 * bluetooth.h
 *
 *  Created on: Jun 12, 2024
 *      Author: choua
 */

#ifndef INC_BLUETOOTH_H_
#define INC_BLUETOOTH_H_

#define MSG_LEN 16
#define MSG_FRONT '#'
#define MSG_END '\n'
#define BT_UART huart2

//User's Parameter
//Call User CB
void(*User_TxCplt_CB)(void);
void(*User_RxCplt_CB)(const uint8_t*);


//Public function
void BT_Config(void(*_User_TxCplt_CB)(void), void(*_User_RxCplt_CB)(const uint8_t*));
uint8_t BT_Transmit(const uint8_t *msg);
uint8_t BT_Transmit_Str(const char *str);
uint8_t BT_StartGetCMD();

//Private
void BT_TxCplt_CB();
void BT_RxCplt_CB();
uint8_t tx_cplt, rx_cplt;
uint8_t tx_msg[MSG_LEN], rx_msg[MSG_LEN];
uint8_t dma;



void BT_Config(void(*_User_TxCplt_CB)(void), void(*_User_RxCplt_CB)(const uint8_t*))
{
	User_TxCplt_CB = _User_TxCplt_CB;
	User_RxCplt_CB = _User_RxCplt_CB;
	HAL_UART_RegisterCallback(&BT_UART, HAL_UART_TX_COMPLETE_CB_ID, BT_TxCplt_CB);
	HAL_UART_RegisterCallback(&BT_UART, HAL_UART_RX_COMPLETE_CB_ID, BT_RxCplt_CB);
	tx_cplt = 1;
	rx_cplt = 1;
	dma = 0;
}

uint8_t BT_Transmit(const uint8_t* msg)
{
	if(tx_cplt == 0)
		return 0;
	tx_cplt = 0;
	memset(tx_msg, ' ', sizeof(uint8_t)*MSG_LEN);
	memcpy(tx_msg+1, msg, sizeof(uint8_t)*(MSG_LEN-2));
	tx_msg[0] = MSG_FRONT;
	tx_msg[MSG_LEN-1] = MSG_END;
	HAL_UART_Transmit_DMA(&BT_UART, tx_msg, MSG_LEN);
	return 1;
}

uint8_t BT_Transmit_Str(const char* str)
{
	if(tx_cplt == 0)
		return 0;
	tx_cplt = 0;
	memset(tx_msg, ' ', sizeof(uint8_t)*MSG_LEN);
	if(strlen(str) < MSG_LEN-2)
		memcpy(tx_msg+1, str, sizeof(uint8_t)*(strlen(str)));
	else
		memcpy(tx_msg+1, str, sizeof(uint8_t)*(MSG_LEN-2));
	tx_msg[0] = MSG_FRONT;
	tx_msg[MSG_LEN-1] = MSG_END;
	HAL_UART_Transmit_DMA(&BT_UART, tx_msg, MSG_LEN);
	return 1;
}

uint8_t BT_StartGetCMD()
{
	if(rx_cplt == 0)
		return 0;
	rx_cplt = 0;
	memset(rx_msg, 0, sizeof(uint8_t)*MSG_LEN);
	HAL_UART_Receive_IT(&BT_UART, rx_msg, 1);
	return 1;
}

void BT_TxCplt_CB()
{
	tx_cplt = 1;
	User_TxCplt_CB();

}

void BT_RxCplt_CB()
{
	if(dma == 0)
	{
		if(rx_msg[0] == MSG_FRONT)
		{
			HAL_UART_Receive_DMA(&BT_UART, rx_msg+1, MSG_LEN-1);
			dma = 1;
		}
		else
		{
			HAL_UART_Receive_IT(&BT_UART, rx_msg, 1);
		}
	}
	else
	{
		dma = 0;
		rx_cplt = 1;
		User_RxCplt_CB(rx_msg);
		HAL_UART_Receive_IT(&BT_UART, rx_msg, 1);
	}
}
#endif /* INC_BLUETOOTH_H_ */
