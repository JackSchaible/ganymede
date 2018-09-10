import { EncounterModule } from './encounter.module';

describe('EncounterModule', () => {
  let encounterModule: EncounterModule;

  beforeEach(() => {
    encounterModule = new EncounterModule();
  });

  it('should create an instance', () => {
    expect(encounterModule).toBeTruthy();
  });
});
