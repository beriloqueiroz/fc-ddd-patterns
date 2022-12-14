import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressReplacedEvent from "../customer-address-replaced.event";

export default class SendConsoleWhenCustomerAddressCreated implements EventHandlerInterface<CustomerAddressReplacedEvent> {
    handle(event: CustomerAddressReplacedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.Address}`)
    }
}