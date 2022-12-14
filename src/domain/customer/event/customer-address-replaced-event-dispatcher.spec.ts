import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerAddressReplacedEvent from "./customer-address-replaced.event";
import SendConsoleWhenCustomerAddressCreated from "./handler/send-console-replaced-address.handle";

describe("Domain events to customer address replaced tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleWhenCustomerAddressCreated();

        eventDispatcher.register("CustomerAddressReplacedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressReplacedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressReplacedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerAddressReplacedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleWhenCustomerAddressCreated();

        eventDispatcher.register("CustomerAddressReplacedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressReplacedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerAddressReplacedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressReplacedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressReplacedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleWhenCustomerAddressCreated();

        eventDispatcher.register("CustomerAddressReplacedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressReplacedEvent"][0]).toMatchObject(eventHandler);


        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerAddressReplacedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleWhenCustomerAddressCreated();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressReplacedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressReplacedEvent"][0]).toMatchObject(eventHandler);

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "13330-250", "São Paulo");
        customer.Address = address;
        customer.activate();

        const customerAddressReplacedEvent = new CustomerAddressReplacedEvent(customer);

        eventDispatcher.notify(customerAddressReplacedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});
