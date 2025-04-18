class UpdateAccountUseCase {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  async execute(accountId, updateData) {
    // Logic để cập nhật tài khoản
    return await this.accountRepository.update(accountId, updateData);
  }
}

module.exports = UpdateAccountUseCase; 