import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from "@companion-module/base"
import { GetConfigFields, type ModuleConfig } from "./config.js"
import { UpdateVariableDefinitions } from "./variables.js"
import { UpgradeScripts } from "./upgrades.js"
import { UpdateActions } from "./actions.js"
import { UpdateFeedbacks } from "./feedbacks.js"
import { PiSignageClient } from "./services/pisignage/client.js"
import { clientConfig } from "./services/pisignage/schemas.js"

export class ModuleInstance extends InstanceBase<ModuleConfig> {
  config!: ModuleConfig // Setup in init()
  #client: PiSignageClient|undefined

  get client() {
    if (!this.#client) throw new Error("PiSignage client must be initialized before the appliciation starts")
    return this.#client
  }
  set client(client: PiSignageClient) {
    this.#client = client
  }

  constructor(internal: unknown) {
    super(internal)
  }

  async init(config: ModuleConfig): Promise<void> {
    this.log("info", "Starting PiSignage module")
    this.config = config

    this.client = new PiSignageClient(clientConfig.parse(this.config))

    this.updateStatus(InstanceStatus.Ok)

    this.updateActions() // export actions
    this.updateFeedbacks() // export feedbacks
    this.updateVariableDefinitions() // export variable definitions
  }
  // When module gets deleted
  async destroy(): Promise<void> {
    this.log("debug", "destroy")
  }

  async configUpdated(config: ModuleConfig): Promise<void> {
    this.config = config
  }

  // Return config fields for web config
  getConfigFields(): SomeCompanionConfigField[] {
    return GetConfigFields()
  }

  updateActions(): void {
    UpdateActions(this)
  }

  updateFeedbacks(): void {
    UpdateFeedbacks(this)
  }

  updateVariableDefinitions(): void {
    UpdateVariableDefinitions(this)
  }
}

runEntrypoint(ModuleInstance, UpgradeScripts)
