import { PackagingConfig } from "@/types/packaging";

class HistoryManager {
    private history: PackagingConfig[] = [];
    private currentIndex: number = -1;
    private maxSize: number = 30;

    constructor(initialState?: PackagingConfig) {
        if (initialState) {
            this.history = [this.cleanConfig(initialState)];
            this.currentIndex = 0;
        }
    }

    // Add a new state to history
    addState(state: PackagingConfig): void {
        // Clean the state of file objects before storing
        const cleanedState = this.cleanConfig(state);

        // If we're not at the end of the history array,
        // we need to remove everything after the current index
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }

        // Add the new state
        this.history.push(cleanedState);
        this.currentIndex++;

        // Maintain history size limit
        if (this.history.length > this.maxSize) {
            this.history.shift();
            this.currentIndex--;
        }
    }

    // Get the previous state
    undo(): PackagingConfig | null {
        if (this.currentIndex <= 0) {
            return null;
        }

        this.currentIndex--;
        return this.history[this.currentIndex];
    }

    // Get the next state
    redo(): PackagingConfig | null {
        if (this.currentIndex >= this.history.length - 1) {
            return null;
        }

        this.currentIndex++;
        return this.history[this.currentIndex];
    }

    // Check if undo is available
    canUndo(): boolean {
        return this.currentIndex > 0;
    }

    // Check if redo is available
    canRedo(): boolean {
        return this.currentIndex < this.history.length - 1;
    }

    // Clean the config of file objects that can't be serialized
    private cleanConfig(config: PackagingConfig): PackagingConfig {
        const cleanedConfig = { ...config };
        // Convert file objects to null for storage
        cleanedConfig.backgroundImage = null;
        cleanedConfig.brandLogoImage = null;
        cleanedConfig.flapLogoImage = null;
        cleanedConfig.certificationImage = null;

        return cleanedConfig;
    }

    // Get current state
    getCurrentState(): PackagingConfig | null {
        if (this.currentIndex < 0 || this.currentIndex >= this.history.length) {
            return null;
        }

        return this.history[this.currentIndex];
    }
}

export default HistoryManager;